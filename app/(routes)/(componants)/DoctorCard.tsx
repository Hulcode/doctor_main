"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Stethoscope, MapPin } from "lucide-react";

interface DoctorData {
  name: string;
  title: string;
  yearsExperience: number;
  imageUrl: string | null;
}

const DoctorCard = ({
  stats,
  doctor,
}: {
  stats: { value: string; label: string }[];
  doctor: DoctorData;
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = (x / rect.width - 0.5) * 16;
    const rotateX = (y / rect.height - 0.5) * -16;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const sparkles = [
    { top: "10%", left: "30%", size: 1.5, opacity: 0.35 },
    { top: "16%", left: "68%", size: 1.5, opacity: 0.3 },
    { top: "24%", left: "48%", size: 1, opacity: 0.25 },
    { top: "32%", left: "78%", size: 1.5, opacity: 0.3 },
    { top: "20%", left: "20%", size: 1, opacity: 0.25 },
  ];

  // Shield / player-card silhouette
  const CARD_CLIP =
    "polygon(18% 0%, 82% 0%, 94% 3%, 99% 10%, 100% 18%, 99% 30%, 96% 42%, 92% 55%, 86% 66%, 78% 76%, 68% 85%, 58% 93%, 50% 100%, 42% 93%, 32% 85%, 22% 76%, 14% 66%, 8% 55%, 4% 42%, 1% 30%, 0% 18%, 1% 10%, 6% 3%)";

  // Use doctor image if available, otherwise fallback to default
  const doctorImage = doctor?.imageUrl || "/Doctor.jpg";

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-[360px]"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative [perspective:1200px]"
          >
            <motion.div
              animate={{ rotateX: rotate.x, rotateY: rotate.y }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="relative aspect-[0.72] w-full cursor-pointer [transform-style:preserve-3d]"
            >
              {/* Glow behind card */}
              <div
                className="absolute -inset-6 bg-gradient-to-br from-[#f4d374]/40 via-[#d4af37]/25 to-[#8b6914]/20 blur-3xl transition-all duration-500 group-hover:blur-[60px]"
                style={{ clipPath: CARD_CLIP }}
              />

              {/* Gold foil frame */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#fff3cf] via-[#e6c158] to-[#8b6914] p-[3px] shadow-[0_25px_60px_rgba(80,55,10,0.45)]"
                style={{ clipPath: CARD_CLIP }}
              >
                {/* Card body */}
                <div
                  className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#f6dfa0] via-[#d9ab4c] to-[#8a5a12]"
                  style={{ clipPath: CARD_CLIP }}
                >
                  {/* Diagonal chevron texture */}
                  <div
                    className="absolute inset-0 opacity-25"
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 2px, transparent 2px, transparent 14px)`,
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, rgba(255,255,255,0.5), transparent 55%)`,
                    }}
                  />

                  {/* Sparkle field */}
                  <div className="pointer-events-none absolute inset-0">
                    {sparkles.map((s, i) => (
                      <span
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                          top: s.top,
                          left: s.left,
                          width: s.size,
                          height: s.size,
                          opacity: s.opacity,
                        }}
                      />
                    ))}
                  </div>

                  {/* Shine sweep */}
                  <motion.div
                    className="pointer-events-none absolute -inset-[100%] z-30 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Rating + position + badges */}
                  <div className="absolute left-[12%] top-[5%] z-20 flex flex-col items-center">
                    <span
                      className="text-[46px] font-black leading-[0.85] text-white"
                      style={{ textShadow: "0 3px 6px rgba(0,0,0,0.45)" }}
                    >
                      99
                    </span>
                    <span
                      className="mt-1 text-[13px] font-extrabold tracking-[0.15em] text-white/95"
                      style={{ textShadow: "0 2px 4px rgba(0,0,0,0.4)" }}
                    >
                      MD
                    </span>
                    <div className="mt-3 flex flex-col items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/20 ring-1 ring-white/30">
                        <Stethoscope className="h-3.5 w-3.5 text-white" />
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/20 ring-1 ring-white/30">
                        <MapPin className="h-3.5 w-3.5 text-white" />
                      </span>
                    </div>
                  </div>

                  {/* Doctor photo */}
                  <div className="absolute inset-x-[14%] top-0 bottom-[47%] z-10">
                    <Image
                      src={doctorImage}
                      alt={doctor.name}
                      fill
                      priority
                      className="object-contain object-bottom drop-shadow-[0_18px_24px_rgba(0,0,0,0.5)]"
                    />
                  </div>

                  {/* Name ribbon */}
                  <div className="absolute left-1/2 top-[53%] z-20 w-[62%] -translate-x-1/2">
                    <div className="rounded-full bg-black/30 px-3 py-1.5 text-center backdrop-blur-sm">
                      <h2 className="truncate text-base font-extrabold text-white drop-shadow">
                        {doctor.name}
                      </h2>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="absolute left-1/2 top-[62%] z-20 flex w-[46%] -translate-x-1/2 flex-col gap-1.5">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex items-center justify-between gap-2 border-b border-white/20 pb-1 text-[14px] whitespace-nowrap"
                      >
                        <span className="font-medium text-white/80">
                          {stat.label}
                        </span>
                        <span className="font-black text-white">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute -bottom-5 -left-5 z-40 flex items-center gap-3 rounded-2xl border border-[#062657]/10 bg-white/90 backdrop-blur-sm px-4 py-3 shadow-xl"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="absolute h-5 w-5 rounded-full bg-emerald-400/20 animate-ping" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-[#062657] tracking-wide">
              متاح للحجز
            </p>
            <p className="mt-0.5 text-[10px] text-slate-400">احجز موعدك الآن</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DoctorCard;
