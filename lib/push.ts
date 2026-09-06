import webpush from "web-push";
import { prisma } from "@/lib/prisma";

webpush.setVapidDetails(
  "mailto:alhassanahmedsoliman@gmail.com",
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

interface NotificationPayload {
  title: string;
  body: string;
  url?: string;
}

export async function notifyAdmin(payload: NotificationPayload) {
  const subscriptions = await prisma.pushSubscription.findMany();

  await Promise.allSettled(
    subscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          JSON.stringify(payload),
        );
      } catch (err: any) {
        if (err.statusCode === 410 || err.statusCode === 404) {
          // Subscription expired/revoked — clean it up
          await prisma.pushSubscription.delete({
            where: { endpoint: sub.endpoint },
          });
        } else {
          console.error("Push send failed:", err);
        }
      }
    }),
  );
}
