import React from "react";
import { HeartPulse, Clock } from "lucide-react";
import { motion } from "motion/react";
import RenderStars from "./StarsRender";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type review = {
  id: string;
  name: string;
  date: string;
  comment: string;

  rating: number;
};

const ReviewCard = ({ review, index }: { review: review; index: number }) => {
  return (
    <motion.div
      key={review.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white rounded-2xl border border-[#062657]/10 p-6 shadow-sm hover:shadow-xl hover:border-[#075b9f]/20 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header: Avatar + Name + Badge + Date */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <Avatar className="h-12 w-12 border-2 border-[#cda558]/50 shadow-lg">
            <AvatarFallback className="bg-gradient-to-br from-[#0b3d7a] to-[#075b9f] text-white text-xl font-bold">
              {review.name[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-[#062657]">{review.name}</h4>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
                <HeartPulse className="h-3 w-3" />
                مريض حقيقي
              </span>
            </div>

            <div className="flex items-center gap-1 mt-1">
              <Clock className="h-3 w-3 text-slate-300" />
              <span className="text-xs text-slate-400">
                {new Date(review.date).toLocaleDateString("ar-EG", {
                  calendar: "gregory",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            <RenderStars rating={review.rating} />
          </div>
        </div>

        {/* Review Comment */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">
          {review.comment}
        </p>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
