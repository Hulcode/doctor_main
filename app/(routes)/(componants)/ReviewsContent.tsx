"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { MessageCircle, ChevronLeft } from "lucide-react";
import TitleWidge from "../(componants)/TitleWidge";
import ReviewCard from "../(componants)/ReviewCard";
import OverAllRating from "../(componants)/OverAllRating";
import WriteReview from "../(componants)/WriteReview";

// Type for Review
interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

const ReviewsContent = ({
  initialReviews,
  doctorId,
}: {
  initialReviews: Review[];
  doctorId: string;
}) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
    percentage:
      reviews.length > 0
        ? (reviews.filter((r) => r.rating === stars).length / reviews.length) *
          100
        : 0,
  }));

  return (
    <section
      id="reviews"
      dir="rtl"
      className="relative py-14 bg-gradient-to-b from-white to-[#f7fafc] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#075b9f]/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[400px] w-[400px] rounded-full bg-[#be0e10]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <TitleWidge Icon={MessageCircle} title="آراء المرضى" />
          <h2 className="text-4xl font-black text-[#062657] sm:text-5xl">
            ماذا يقول <span className="text-[#075b9f]">مرضانا</span> عنا
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            تجارب حقيقية من مرضى شاركوا رحلتهم العلاجية
          </p>
        </motion.div>

        {/* Rating Summary */}
        <OverAllRating
          averageRating={averageRating}
          ratingDistribution={ratingDistribution}
          length={reviews.length}
        />

        {/* Write Review Form */}
        <WriteReview setReviews={setReviews} doctorId={doctorId} />

        {/* Reviews List - Show only approved reviews */}
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <ReviewCard review={review} index={index} key={review.id} />
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <p className="text-slate-500">لا توجد تقييمات بعد.</p>
              <p className="text-slate-400 text-sm mt-1">
                كن أول من يشارك تجربته مع الدكتور.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewsContent;
