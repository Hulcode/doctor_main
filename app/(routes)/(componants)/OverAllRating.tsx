import React from "react";
import { motion } from "motion/react";
import { HeartPulse } from "lucide-react";
import RenderStars from "./StarsRender";
const OverAllRating = ({
  averageRating,
  ratingDistribution,
  length,
}: {
  averageRating: number;
  ratingDistribution: { stars: number; count: number; percentage: number }[];
  length: number;
}) => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid gap-8 mb-12 md:grid-cols-[300px_1fr] bg-white rounded-2xl border border-[#062657]/10 p-6 shadow-sm"
      >
        {/* Left - Overall Rating */}
        <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-l border-[#062657]/10 pb-6 md:pb-0 md:pl-6">
          <div className="flex items-center gap-4">
            <span className="text-6xl font-black text-[#062657]">
              {averageRating.toFixed(1)}
            </span>
            <div className="flex flex-col items-start">
              <div className="flex">
                <RenderStars rating={Math.round(averageRating)} />
              </div>
              <span className="text-sm text-slate-400 mt-1">
                ({length} تقييم)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 text-sm text-emerald-600">
            <HeartPulse className="h-4 w-4" />
            <span>ثقة عالية من المرضى</span>
          </div>
        </div>

        {/* Right - Rating Distribution */}
        <div className="flex flex-col justify-center gap-1.5">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-600 w-10">
                {item.stars} {item.stars === 1 ? "نجمة" : "نجوم"}
              </span>
              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="text-sm text-slate-400 w-12 text-left">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default OverAllRating;
