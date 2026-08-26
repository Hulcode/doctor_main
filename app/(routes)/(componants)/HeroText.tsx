"use client";

import { motion } from "motion/react";
import { HeartPulse, CalendarDays } from "lucide-react";
import TitleWidge from "./TitleWidge";

interface DoctorData {
  name: string;
  title: string;
  yearsExperience: number;
  description: string;
}

const HeroText = ({ doctor }: { doctor: DoctorData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
      className="max-w-2xl"
    >
      {/* Badge */}

      <TitleWidge Icon={HeartPulse} title={doctor.title} />

      {/* Heading */}
      <h1 className="text-5xl font-black leading-[1.2] tracking-tight text-[#062657] sm:text-6xl lg:text-[70px]">
        لأن قلبك يستحق
        <br />
        <span className="text-[#075b9f]">عناية استثنائية</span>
      </h1>

      {/* Description */}
      <p className="mt-4 text-slate-600 leading-relaxed">
        {doctor.description.length > 100
          ? doctor.description.slice(0, 100) + "..."
          : doctor.description}
      </p>

      {/* Buttons */}
      <div className="mt-9 flex flex-wrap gap-4">
        <a
          href="#booking"
          className="group flex items-center gap-3 rounded-full bg-[#062657] px-7 py-4 font-semibold text-white shadow-lg shadow-[#062657]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#0b3d7a]"
        >
          <CalendarDays className="h-5 w-5" />
          <span>احجز موعدك الآن</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:-translate-x-1"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </a>
        <a
          href="/about"
          className="group flex items-center gap-3 rounded-full border border-[#062657]/15 bg-white px-7 py-4 font-semibold text-[#062657] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#075b9f]/30 hover:shadow-md"
        >
          اقرأ المزيد
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:-translate-x-1"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </a>
      </div>

      {/* Trust line */}
      <div className="mt-12 flex items-center gap-3 text-sm text-slate-400">
        <div className="flex -space-x-2 space-x-reverse">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-100">
            <HeartPulse className="h-3.5 w-3.5 text-[#be0e10]" />
          </div>
        </div>
        <span>رعاية طبية تبدأ بالثقة والاطمئنان</span>
      </div>
    </motion.div>
  );
};

export default HeroText;
