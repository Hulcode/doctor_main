"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Award,
  ChevronLeft,
  CalendarDays,
  HeartPulse,
  Stethoscope,
  Clock,
} from "lucide-react";
import TitleWidge from "../(componants)/TitleWidge";

// Type for Doctor data
interface DoctorData {
  title: string;
  yearsExperience: number;
  description: string;
}

const AboutText = ({ doctor }: { doctor: DoctorData }) => {
  const specialties = [
    {
      icon: HeartPulse,
      title: "قسطرة قلبية",
      description: "تشخيص وعلاج انسداد الشرايين باستخدام أحدث التقنيات",
    },
    {
      icon: Stethoscope,
      title: "تشخيص دقيق",
      description: "استخدام أحدث الأجهزة للتشخيص المبكر لأمراض القلب",
    },
    {
      icon: Clock,
      title: "متابعة مستمرة",
      description: "رعاية شاملة تبدأ من التشخيص وتستمر حتى التعافي الكامل",
    },
  ];

  const achievements = [
    { value: `${doctor.yearsExperience}+`, label: "سنوات الخبرة" },
    { value: "5,000+", label: "عملية ناجحة" },
    { value: "98%", label: "رضا المرضى" },
    { value: "50+", label: "جائزة طبية" },
  ];

  return (
    <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
      {/* Section Header */}
      <div className="text-center mb-16">
        <TitleWidge Icon={Award} title="خبرة وثقة" />
        <h2 className="text-4xl font-black text-[#062657] sm:text-5xl">
          نبذة عن
          <span className="text-[#075b9f]">{"  "}الدكتور</span>
        </h2>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
          رحلة من التميز الطبي والعناية الفائقة بقلوب المرضى
        </p>
      </div>

      {/* Right side - Content */}
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-[#062657]">{doctor.title}</h3>
          <p className="mt-4 text-slate-600 leading-relaxed">
            {doctor.description}
          </p>
        </div>

        {/* Specialties grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {specialties.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-[#062657]/10 bg-white p-4 transition-all hover:shadow-lg hover:border-[#075b9f]/20"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-[#075b9f]/10 p-2.5 text-[#075b9f] group-hover:bg-[#075b9f] group-hover:text-white transition-all">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#062657] text-sm">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Achievements stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 pt-4 border-t border-[#062657]/10">
          {achievements.map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-xl font-black text-[#075b9f]">{item.value}</p>
              <p className="text-[10px] text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href="/#booking"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-full bg-[#062657] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#062657]/20 transition-all hover:bg-[#0b3d7a] hover:-translate-y-0.5"
        >
          <CalendarDays className="h-4 w-4" />
          احجز موعداً للاستشارة
          <ChevronLeft className="h-4 w-4" />
        </motion.a>
      </div>
    </div>
  );
};

export default AboutText;
