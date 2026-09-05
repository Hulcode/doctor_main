"use client";
import React from "react";
import {
  CalendarDays,
  Clock,
  User,
  Phone,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { getDateAfter, getDayFromString } from "@/lib/helper";
import { motion } from "motion/react";
import { useState } from "react";
import { bookAppointment } from "@/app/actions/apointment";
import toast from "react-hot-toast";
import { generateSlots } from "@/lib/helper";
const ApointmentForm = ({
  bookedAppointments,
  doctorId,
  scheduleDays,
}: {
  bookedAppointments: string[];
  doctorId: string;
  scheduleDays: {
    from: string;
    to: string;
    appointmentDuration: number;
    isDayOff: boolean;
  }[];
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const timeSlots = scheduleDays.map((day) => {
    if (day.isDayOff) return []; // Empty array for day off
    return generateSlots(
      day.from,
      day.to,
      day.appointmentDuration,
      selectedDate,
    );
  });
  // Get the available slots for the selected date
  const availableSlots = selectedDate
    ? timeSlots[getDayFromString(selectedDate)]
    : [];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setSelectedTime(""); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    console.log(1);
    const formData = new FormData(form);

    // Add hidden fields to FormData
    formData.set("date", selectedDate);
    formData.set("time", selectedTime);
    console.log(2);
    try {
      const result = await bookAppointment(formData, doctorId);

      if (result?.error) {
        toast.error(result.error);
        setIsLoading(false);
        return;
      }
      console.log(3);
      // Success
      setSubmitted(true);
      toast.success("تم الحجز بنجاح! 🎉");
      setIsLoading(false);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("حدث خطأ غير متوقع. حاول مرة أخرى.");
      setIsLoading(false);
      console.log(4);
    }
  };

  // Check if a slot is booked
  const isSlotBooked = (time: string) => {
    return bookedAppointments.includes(`${selectedDate}-${time}`);
  };

  return (
    <div>
      <motion.div
        initial={{ x: 60 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="absolute -inset-4 rounded-[40px] bg-[#075b9f]/10 blur-3xl" />

        <div className="relative rounded-[30px] border border-[#062657]/10 bg-white/90 backdrop-blur-sm p-8 shadow-[0_20px_60px_rgba(6,38,87,0.1)] sm:p-10">
          <div className="absolute top-0 right-0 left-0 h-1.5 rounded-t-[30px] bg-gradient-to-l from-[#cda558] via-[#e8c97e] to-[#cda558]" />

          <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-gradient-to-br from-[#075b9f]/5 to-transparent" />

          <div className="relative z-20">
            <h3 className="text-2xl font-extrabold text-[#062657] mb-1 text-center">
              نموذج الحجز
            </h3>
            <p className="text-slate-400 text-sm mb-8 text-center">
              اختر التاريخ والوقت المناسب لك (متاح حتى أسبوع)
            </p>

            {submitted ? (
              /* Success Message */
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200">
                  <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                </div>
                <h4 className="text-2xl font-bold text-[#062657] mb-2">
                  تم الحجز بنجاح!
                </h4>
                <p className="text-slate-500">
                  سيتم اعلامك اذا حدث تغيير في الحجز{" "}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#062657]">
                    <User className="h-4 w-4 text-[#075b9f]" />
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    placeholder="أدخل اسمك الكامل"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[#062657] placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#075b9f] focus:bg-white focus:ring-4 focus:ring-[#075b9f]/10"
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#062657]">
                    <Phone className="h-4 w-4 text-[#075b9f]" />
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    placeholder="01xxxxxxxxx"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[#062657] placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#075b9f] focus:bg-white focus:ring-4 focus:ring-[#075b9f]/10"
                  />
                </div>

                {/* ============================================
                        DATE INPUT - Date Picker
                    ============================================ */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#062657]">
                    <CalendarDays className="h-4 w-4 text-[#075b9f]" />
                    اختر اليوم
                  </label>
                  <input
                    type="date"
                    required
                    name="date"
                    min={getDateAfter(0)}
                    max={getDateAfter(6)}
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[#062657] outline-none transition-all duration-300 focus:border-[#075b9f] focus:bg-white focus:ring-4 focus:ring-[#075b9f]/10 [color-scheme:light]"
                  />
                </div>

                {/* ============================================
                        TIME SELECTION - Small Buttons
                    ============================================ */}
                {selectedDate && (
                  <div>
                    <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#062657]">
                      <Clock className="h-4 w-4 text-[#075b9f]" />
                      اختر الوقت
                    </label>

                    {availableSlots.length === 0 ? (
                      /* Show message if no slots available */
                      <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                        <p className="text-slate-500 font-medium">
                          لا توجد مواعيد متاحة في هذا اليوم
                        </p>
                        <p className="text-slate-400 text-sm mt-1">
                          يرجى اختيار يوم آخر
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {availableSlots.map((slot) => {
                          const isBooked = isSlotBooked(slot.time);
                          const isSelected = selectedTime === slot.time;

                          return (
                            <button
                              key={slot.time}
                              type="button"
                              disabled={isBooked}
                              onClick={() => handleTimeSelect(slot.time)}
                              className={`rounded-xl border-2 px-2 py-3 text-sm font-bold transition-all duration-300 ${
                                isBooked
                                  ? "cursor-not-allowed border-slate-100 bg-slate-100 text-slate-300 line-through"
                                  : isSelected
                                    ? "border-[#cda558] bg-[#cda558] text-white shadow-lg shadow-[#cda558]/20"
                                    : "border-slate-200 bg-white text-[#062657] hover:border-[#cda558] hover:text-[#cda558]"
                              }`}
                            >
                              {slot.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* ============================================
                        SUBMIT
                    ============================================ */}
                <button
                  type="submit"
                  disabled={!selectedDate || !selectedTime || isLoading}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-l from-[#062657] to-[#0b3d7a] px-6 py-4 font-bold text-white shadow-lg shadow-[#062657]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#062657]/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {/* Shine on button */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        جاري الحجز...
                      </>
                    ) : (
                      <>
                        <CalendarDays className="h-5 w-5" />
                        {selectedDate && selectedTime
                          ? "تأكيد الحجز الآن"
                          : "اختر اليوم والوقت أولاً"}
                      </>
                    )}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ApointmentForm;
