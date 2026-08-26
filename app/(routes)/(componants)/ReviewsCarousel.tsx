"use client";

import { motion, AnimatePresence } from "motion/react";
import { Star, Quote, ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import TitleWidge from "../(componants)/TitleWidge";
import RenderStars from "../(componants)/StarsRender";

// Type for Review
interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
}

const ReviewsCarousel = ({ reviews }: { reviews: Review[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Auto-play every 5 seconds
  useEffect(() => {
    if (!isAutoplay || reviews.length <= 1) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay, reviews.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  if (reviews.length === 0) {
    return (
      <section
        id="reviews"
        dir="rtl"
        className="relative overflow-hidden bg-[#f7fafc] py-24"
      >
        <div className="text-center">
          <p className="text-slate-500">لا توجد تقييمات بعد.</p>
        </div>
      </section>
    );
  }

  const review = reviews[currentIndex];

  return (
    <section
      id="reviews"
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

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <TitleWidge Icon={Star} title="آراء المرضى" />
          <h2 className="text-4xl font-black text-[#062657] sm:text-5xl">
            ماذا يقول <span className="text-[#075b9f]">مرضانا</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            ثقة المرضى هي أساس عملنا. هذه بعض التجارب الحقيقية من الأشخاص الذين
            وثقوا بنا.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          {/* Main Card */}
          <div className="relative rounded-[30px] border border-[#062657]/10 bg-white/90 backdrop-blur-sm p-8 shadow-[0_20px_60px_rgba(6,38,87,0.1)] sm:p-12">
            {/* Top Gold Accent Bar */}
            <div className="absolute top-0 right-0 left-0 h-1.5 rounded-t-[30px] bg-gradient-to-l from-[#cda558] via-[#e8c97e] to-[#cda558]" />

            {/* Quote Icon Background */}
            <div className="absolute -top-4 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#075b9f] text-white shadow-lg shadow-[#075b9f]/30">
              <Quote className="h-6 w-6" />
            </div>

            <div className="relative z-10 min-h-[280px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -80 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Stars */}
                  <div className="mb-6">
                    <RenderStars rating={review.rating} />
                  </div>

                  {/* Review Text */}
                  <p className="text-xl leading-9 text-slate-600 max-w-2xl mb-8">
                    "{review.text}"
                  </p>

                  {/* Reviewer Info */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#0b3d7a] to-[#075b9f] text-white text-xl font-bold shadow-lg shadow-[#075b9f]/30">
                      {review.name[0]}
                    </div>
                    <div className="text-right">
                      <h4 className="text-lg font-extrabold text-[#062657]">
                        {review.name}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Controls */}
          {reviews.length > 1 && (
            <div className="mt-8 flex items-center justify-center gap-6">
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-[#062657] shadow-sm transition-all duration-300 hover:border-[#075b9f] hover:bg-[#075b9f] hover:text-white hover:shadow-lg hover:shadow-[#075b9f]/20"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-8 bg-[#cda558]"
                        : "w-2.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-[#062657] shadow-sm transition-all duration-300 hover:border-[#075b9f] hover:bg-[#075b9f] hover:text-white hover:shadow-lg hover:shadow-[#075b9f]/20"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsCarousel;
