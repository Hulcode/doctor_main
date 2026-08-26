"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function setReview(formData: FormData, doctorId: string) {
  try {
    // ============================================
    // 1. EXTRACT DATA FROM FORM
    // ============================================
    const name = formData.get("name") as string;

    const content = formData.get("content") as string;
    const stars = Number(formData.get("stars") as string);

    // ============================================
    // 2. VALIDATE INPUT
    // ============================================
    if (!name || !content || !stars) {
      return { error: "جميع الحقول مطلوبة" };
    }

    if (!content.trim()) {
      return { error: "يرجى كتابة تعليقك" };
    }

    if (stars < 1 || stars > 5) {
      return { error: "يرجى اختيار تقييم من 1 إلى 5 نجوم" };
    }

    // Validate phone number (Egyptian format - starts with 01, 11 digits)

    // Check if doctor exists
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
    });

    if (!doctor) {
      return { error: "الطبيب غير موجود" };
    }

    const review = await prisma.review.create({
      data: {
        doctorId,
        name,
        content: content.trim(),
        stars,
        status: "PENDING", // New reviews start as pending
      },
    });

    // ============================================
    // 5. REVALIDATE PATHS
    // ============================================
    revalidatePath("/reviews"); // Refresh reviews page

    return { success: true, reviewId: review.id };
  } catch (error) {
    console.error("Error creating review:", error);
    return { error: "حدث خطأ غير متوقع. حاول مرة أخرى." };
  }
}
