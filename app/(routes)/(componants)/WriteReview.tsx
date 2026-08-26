"use client";

import React from "react";
import RenderStars from "../(componants)/StarsRender";
import { MessageCircle, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { setReview } from "@/app/actions/reviews";

type review = {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
};

const WriteReview = ({
  setReviews,

  doctorId,
}: {
  setReviews: React.Dispatch<React.SetStateAction<review[]>>;

  doctorId: string; // Pass doctorId from parent
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [name, setName] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0 || !reviewText.trim() || !name.trim()) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData
      const formData = new FormData();
      formData.set("name", name);

      formData.set("content", reviewText);
      formData.set("stars", rating.toString());

      // Call server action
      const result = await setReview(formData, doctorId);

      if (result?.error) {
        toast.error(result.error);
        setIsSubmitting(false);
        return;
      }

      if (result?.success) {
        // Optimistic update - add review to local state
        const newReview: review = {
          id: result.reviewId,
          name: name,
          rating: rating,
          date: new Date().toISOString().split("T")[0],
          comment: reviewText,
        };

        setReviews((prev) => [...prev, newReview]);

        // Reset form
        setRating(0);
        setReviewText("");
        setName("");

        setIsSubmitting(false);
        setSubmitSuccess(true);

        toast.success("تم إرسال تقييمك بنجاح! سيتم مراجعته قريبًا.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("حدث خطأ غير متوقع. حاول مرة أخرى.");
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-2xl border border-[#062657]/10 p-6 mb-12 shadow-sm"
      >
        <h3 className="text-xl font-bold text-[#062657] mb-4 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-[#075b9f]" />
          شاركنا تجربتك
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                الاسم
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="أدخل اسمك"
                className="w-full rounded-lg border border-[#062657]/15 px-4 py-2.5 text-sm focus:border-[#075b9f] focus:outline-none focus:ring-2 focus:ring-[#075b9f]/20 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              التقييم
            </label>
            <div className="flex items-center gap-2">
              <RenderStars
                setRating={setRating}
                setHoverRating={setHoverRating}
                hoverRating={hoverRating}
                rating={rating}
                interactive={true}
              />
              <span className="text-sm text-slate-400 mr-2">
                {rating > 0 ? `${rating} نجوم` : "اختر التقييم"}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              تجربتك
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="شاركنا تفاصيل تجربتك مع الدكتور..."
              rows={4}
              className="w-full rounded-lg border border-[#062657]/15 px-4 py-2.5 text-sm resize-none focus:border-[#075b9f] focus:outline-none focus:ring-2 focus:ring-[#075b9f]/20 transition-all"
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={
                isSubmitting ||
                rating === 0 ||
                !reviewText.trim() ||
                !name.trim()
              }
              className="inline-flex items-center gap-2 rounded-full bg-[#062657] px-6 py-2.5 font-semibold text-white shadow-lg shadow-[#062657]/20 transition-all hover:bg-[#0b3d7a] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  إرسال التقييم
                </>
              )}
            </button>

            {submitSuccess && (
              <span className="text-sm text-emerald-600 animate-fade-in">
                ✓ تم إرسال تقييمك بنجاح
              </span>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default WriteReview;
