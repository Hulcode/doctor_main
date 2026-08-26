import { prisma } from "@/lib/prisma";

import ApointmentForm from "../(componants)/ApointmentForm";

import BookingTextSection from "../(componants)/BookingTextSection";

const BookingSection = async () => {
  const doctor = await prisma.doctor.findFirst();

  if (!doctor) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-500">
          ⚠️ لم يتم العثور على طبيب. يرجى إضافة طبيب في قاعدة البيانات.
        </p>
      </div>
    );
  }

  const schedule = await prisma.schedule.findUnique({
    where: { doctorId: doctor.id },
  });

  if (!schedule) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-500">⚠️ لم يتم العثور على جدول عمل للطبيب.</p>
      </div>
    );
  }
  // ============================================
  const daysData = schedule.days as any;

  let scheduleDays: Array<{
    from: string;
    to: string;
    appointmentDuration: number;
    isDayOff: boolean;
  }> = [];

  try {
    if (Array.isArray(daysData)) {
      scheduleDays = daysData;
    } else if (daysData && Array.isArray(daysData.days)) {
      scheduleDays = daysData.days;
    }
  } catch (err) {
    console.error(
      "Malformed schedule.days for schedule",
      schedule.id,
      daysData,
    );
    scheduleDays = [];
  }
  // Generate timeSlots array (7 arrays for 7 days)

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const appointments = await prisma.appointment.findMany({
    where: {
      doctorId: doctor.id,
      date: {
        gte: today,
        lte: nextWeek,
      },
      status: {
        in: ["PENDING"],
      },
    },
    select: {
      date: true,
      time: true,
    },
  });

  // Format booked appointments as "YYYY-MM-DD-HH:mm"
  const bookedAppointments = appointments.map((app) => {
    const dateStr = app.date.toISOString().split("T")[0]; // YYYY-MM-DD
    return `${dateStr}-${app.time}`;
  });

  return (
    <section
      id="booking"
      dir="rtl"
      className="relative overflow-hidden bg-[#f7fafc] py-24"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#075b9f]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[400px] w-[400px] rounded-full bg-[#be0e10]/5 blur-[120px]" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(#062657 1px, transparent 1px),
            linear-gradient(90deg, #062657 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <BookingTextSection />

          {/* RIGHT: Booking Form */}
          <ApointmentForm
            bookedAppointments={bookedAppointments}
            doctorId={doctor.id}
            scheduleDays={scheduleDays}
          />
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
