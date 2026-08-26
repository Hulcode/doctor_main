import { prisma } from "@/lib/prisma";
import DoctorCard from "../(componants)/DoctorCard";
import HeroText from "../(componants)/HeroText";

const Hero = async () => {
  // Fetch doctor from database
  const doctor = await prisma.doctor.findFirst();

  if (!doctor) {
    return (
      <section
        id="hero"
        dir="rtl"
        className="relative min-h-screen overflow-hidden bg-[#f7fafc]"
      >
        <div className="p-10 text-center">
          <p className="text-red-500">
            ⚠️ لم يتم العثور على طبيب. يرجى إضافة طبيب في قاعدة البيانات.
          </p>
        </div>
      </section>
    );
  }

  const stats = [
    { value: `${doctor.yearsExperience}+`, label: "سنة خبرة" },
    { value: "5K+", label: "إجراء طبي" },
    { value: "98%", label: "رضا المرضى" },
  ];

  return (
    <section
      id="hero"
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#f7fafc]"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#075b9f]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[400px] w-[400px] rounded-full bg-[#d4af37]/10 blur-[120px]" />

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
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-15 lg:px-10">
        <div className="grid w-full items-center gap-20 lg:grid-cols-[0.9fr_1.1fr]">
          <DoctorCard stats={stats} doctor={doctor} />
          <HeroText doctor={doctor} />
        </div>
      </div>

      {/* Scroll indicator */}
    </section>
  );
};

export default Hero;
