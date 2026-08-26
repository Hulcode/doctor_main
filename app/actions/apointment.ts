"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

export async function bookAppointment(formData: FormData, doctorId: string) {
  // ============================================
  // 1. EXTRACT DATA FROM FORM
  // ============================================
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const date = formData.get("date") as string; // "2026-08-25"
  const time = formData.get("time") as string; // "10:30"

  // ============================================
  // 2. VALIDATE INPUT
  // ============================================
  if (!name || !phone || !date || !time || !doctorId) {
    return { error: "جميع الحقول مطلوبة" };
  }

  // Validate phone number (Egyptian format - starts with 01, 11 digits)
  if (!/^01[0-9]{9}$/.test(phone)) {
    return { error: "رقم الهاتف غير صحيح" };
  }

  // Validate date (must be today or future)
  const appointmentDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (appointmentDate < today) {
    return { error: "لا يمكن حجز موعد في تاريخ ماضي" };
  }

  // ============================================
  // 3. FIND OR CREATE PATIENT (based on phone)
  // ============================================
  let patient = await prisma.patient.findUnique({ where: { phone } });

  if (!patient) {
    // Create new patient if not exists
    patient = await prisma.patient.create({
      data: {
        name,
        phone,
        doctorId,
      },
    });
  } else {
    // Update patient name if changed
    await prisma.patient.update({
      where: { id: patient.id },
      data: { name },
    });
  }
  if (patient.isBlocked) {
    return { error: "لا يمكنك حجز موعد" };
  }
  // ============================================
  // 4. CHECK FOR DOUBLE BOOKING
  // ============================================
  const existingAppointment = await prisma.appointment.findUnique({
    where: {
      doctorId_date_time: {
        doctorId,
        date: appointmentDate,
        time,
      },
    },
  });

  if (existingAppointment) {
    return { error: "هذا الموعد محجوز بالفعل. اختر وقتًا آخر." };
  }

  // ============================================
  // 5. CREATE APPOINTMENT
  // ============================================
  const appointment = await prisma.appointment.create({
    data: {
      patientId: patient.id,
      doctorId,
      date: appointmentDate,
      time,
      status: "PENDING", // Will be confirmed by admin
    },
  });
  revalidatePath("/admin");
  // ============================================
  // 6. REVALIDATE & REDIRECT
  // ============================================

  // Redirect to success page or show success message
  //   redirect(`/booking/success?appointmentId=${appointment.id}`);
}
