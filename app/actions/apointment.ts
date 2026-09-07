"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { notifyAdmin } from "@/lib/push";

// ============================================
// SIMPLE RATE LIMITER
// ============================================

const attempts = new Map<string, { count: number; resetAt: number }>();

const MAX_ATTEMPTS = 3;
const WINDOW_MS = 10 * 60 * 10000; // 100 minutes

function checkRateLimit(key: string) {
  const now = Date.now();
  const current = attempts.get(key);

  // No previous attempts
  if (!current || now > current.resetAt) {
    attempts.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });

    return {
      allowed: true,
      remaining: MAX_ATTEMPTS - 1,
    };
  }

  // Limit exceeded
  if (current.count >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  // Increment attempts
  current.count++;

  return {
    allowed: true,
    remaining: MAX_ATTEMPTS - current.count,
  };
}

// ============================================
// BOOK APPOINTMENT
// ============================================

export async function bookAppointment(formData: FormData, doctorId: string) {
  // ============================================
  // 1. EXTRACT DATA
  // ============================================

  const name = formData.get("name");
  const phone = formData.get("phone");
  const date = formData.get("date");
  const time = formData.get("time");

  // Make sure values are actually strings
  if (
    typeof name !== "string" ||
    typeof phone !== "string" ||
    typeof date !== "string" ||
    typeof time !== "string" ||
    typeof doctorId !== "string"
  ) {
    return { error: "بيانات غير صحيحة" };
  }

  // ============================================
  // 2. NORMALIZE INPUT
  // ============================================

  const cleanName = name.trim();
  const cleanPhone = phone.trim();
  const cleanDate = date.trim();
  const cleanTime = time.trim();

  // ============================================
  // 3. BASIC VALIDATION
  // ============================================

  if (!cleanName || !cleanPhone || !cleanDate || !cleanTime || !doctorId) {
    return { error: "جميع الحقول مطلوبة" };
  }

  // Prevent extremely long input
  if (cleanName.length > 100) {
    return { error: "الاسم طويل جدًا" };
  }

  // Egyptian phone
  if (!/^01[0-9]{9}$/.test(cleanPhone)) {
    return { error: "رقم الهاتف غير صحيح" };
  }

  // ============================================
  // 4. RATE LIMIT
  // ============================================

  const rateLimit = checkRateLimit(`booking:phone:${cleanPhone}`);

  if (!rateLimit.allowed) {
    return {
      error: "لقد حاولت الحجز عدة مرات. حاول مرة أخرى بعد قليل.",
    };
  }

  // ============================================
  // 5. VERIFY DOCTOR
  // ============================================

  const doctor = await prisma.doctor.findUnique({
    where: {
      id: doctorId,
    },
    select: {
      id: true,
    },
  });

  if (!doctor) {
    return {
      error: "الطبيب غير موجود",
    };
  }

  // ============================================
  // 6. VALIDATE DATE
  // ============================================

  const appointmentDate = new Date(cleanDate);

  if (Number.isNaN(appointmentDate.getTime())) {
    return {
      error: "التاريخ غير صحيح",
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (appointmentDate < today) {
    return {
      error: "لا يمكن حجز موعد في تاريخ ماضي",
    };
  }

  // ============================================
  // 7. FIND / CREATE PATIENT
  // ============================================

  let patient = await prisma.patient.findUnique({
    where: {
      phone: cleanPhone,
    },
  });

  if (!patient) {
    patient = await prisma.patient.create({
      data: {
        name: cleanName,
        phone: cleanPhone,
        doctorId: doctor.id,
      },
    });
  } else {
    if (patient.isBlocked) {
      return {
        error: "لا يمكنك حجز موعد",
      };
    }

    patient = await prisma.patient.update({
      where: {
        id: patient.id,
      },
      data: {
        name: cleanName,
      },
    });
  }

  // ============================================
  // 8. CHECK SLOT
  // ============================================

  const existingAppointment = await prisma.appointment.findUnique({
    where: {
      doctorId_date_time: {
        doctorId: doctor.id,
        date: appointmentDate,
        time: cleanTime,
      },
    },
  });

  if (existingAppointment) {
    return {
      error: "هذا الموعد محجوز بالفعل. اختر وقتًا آخر.",
    };
  }

  // ============================================
  // 9. CREATE APPOINTMENT
  // ============================================

  let appointment;

  try {
    appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        doctorId: doctor.id,
        date: appointmentDate,
        time: cleanTime,
        status: "PENDING",
      },
    });
  } catch (error: any) {
    // Database unique constraint caught a race condition
    if (error?.code === "P2002") {
      return {
        error: "هذا الموعد تم حجزه بالفعل. اختر وقتًا آخر.",
      };
    }

    console.error("Appointment creation failed:", error);

    return {
      error: "حدث خطأ أثناء الحجز. حاول مرة أخرى.",
    };
  }

  // ============================================
  // 10. NOTIFY ADMIN
  // ============================================

  try {
    await notifyAdmin({
      title: "موعد جديد",
      body: `${cleanName} حجز موعد يوم ${cleanDate} الساعة ${cleanTime} - ${cleanPhone}`,
      url: process.env.ADMIN_URL,
    });
  } catch (error) {
    console.error("Push notify failed:", error);
  }

  // ============================================
  // 11. REVALIDATE
  // ============================================

  revalidatePath("/");

  return {
    success: true,
    appointmentId: appointment.id,
  };
}
