"use client";

import { motion } from "motion/react";
import { CalendarDays, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import TitleWidge from "../(componants)/TitleWidge";

const BookingTextSection = () => {
  return (
    <motion.div
      initial={{ x: -60 }}
      whileInView={{ x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="max-w-xl"
    >
      <TitleWidge Icon={CalendarDays} title="احجز موعدك الآن" />

      <h2 className="text-4xl font-black leading-[1.2] tracking-tight text-[#062657] sm:text-5xl">
        صحتك تبدأ
        <br />
        <span className="text-[#075b9f]">بموعد واحد</span>
      </h2>

      <p className="mt-6 text-lg leading-9 text-slate-500">
        فريقنا الطبي جاهز لاستقبالك. اختر الوقت المناسب لك، وسنتولى الباقي. نضمن
        لك خصوصية تامة ورعاية طبية تليق بك.
      </p>

      {/* Features List */}
      <div className="mt-10 space-y-5">
        {[
          { icon: ShieldCheck, text: "خصوصية تامة لبياناتك الطبية" },
          { icon: Clock, text: "استجابة سريعة خلال 24 ساعة" },
          { icon: CheckCircle2, text: "جميع الفحوصات تحت إشراف دقيق" },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0b3d7a] to-[#075b9f] text-white shadow-lg shadow-[#075b9f]/30">
              <feature.icon className="h-6 w-6" />
            </div>
            <p className="font-semibold text-[#062657]">{feature.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BookingTextSection;
