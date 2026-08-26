import { prisma } from "@/lib/prisma";
import AboutText from "../(componants)/AboutText";

const About = async () => {
  // Fetch doctor from database
  const doctor = await prisma.doctor.findFirst();

  if (!doctor) {
    return (
      <section
        id="about"
        dir="rtl"
        className="relative py-13 overflow-hidden bg-gradient-to-b from-[#f7fafc] to-white"
      >
        <div className="p-10 text-center">
          <p className="text-red-500">
            ⚠️ لم يتم العثور على طبيب. يرجى إضافة طبيب في قاعدة البيانات.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="about"
      dir="rtl"
      className="relative py-13 overflow-hidden bg-gradient-to-b from-[#f7fafc] to-white"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#075b9f]/5 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 bottom-10 h-[400px] w-[400px] rounded-full bg-[#be0e10]/5 blur-[120px]" />

      <AboutText
        doctor={{
          title: doctor.title,
          yearsExperience: doctor.yearsExperience,
          description: doctor.description,
        }}
      />
    </section>
  );
};

export default About;
