"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  HeartPulse,
  ChevronLeft,
  CalendarDays,
} from "lucide-react";
import logo from "../../../public/noBg.png";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

// Type for Doctor data
interface DoctorData {
  name: string;
  title: string;
  yearsExperience: number;
  description: string;
  phone: string;
  email: string | null;
  address: string | null;
  facebookLink: string | null;
  instagramLink: string | null;
}

const FooterContent = ({ doctor }: { doctor: DoctorData }) => {
  const currentYear = new Date().getFullYear();

  // Dynamic contact info from doctor data
  const contactInfo = {
    phone: {
      label: "رقم الهاتف",
      value: doctor.phone,
      icon: Phone,
      href: `tel:${doctor.phone}`,
    },
    whatsapp: {
      label: "واتساب",
      value: doctor.phone,
      icon: FaWhatsapp,
      href: `https://wa.me/${doctor.phone}`,
    },
    email: {
      label: "البريد الإلكتروني",
      value: doctor.email || "info@dr-ahmed.com",
      icon: Mail,
      href: `mailto:${doctor.email || "info@dr-ahmed.com"}`,
    },
    address: {
      label: "العنوان",
      value: doctor.address || "القاهرة، مصر",
      icon: MapPin,
      href: `https://www.google.com/maps/search/?q=${encodeURIComponent(doctor.address || "القاهرة، مصر")}`,
    },
  };

  const socialLinks = [
    {
      name: "فيسبوك",
      icon: FaFacebook,
      href: doctor.facebookLink || "https://facebook.com",
      color: "hover:bg-[#1877f2]",
    },
    {
      name: "انستغرام",
      icon: FaInstagram,
      href: doctor.instagramLink || "https://instagram.com",
      color: "hover:bg-[#e4405f]",
    },
    // {
    //   name: "يوتيوب",
    //   icon: FaYoutube,
    //   href: "https://youtube.com",
    //   color: "hover:bg-[#ff0000]",
    // },
    // {
    //   name: "تويتر",
    //   icon: FaTwitter,
    //   href: "https://twitter.com",
    //   color: "hover:bg-[#1da1f2]",
    // },
  ];

  const quickLinks = [
    { label: "الرئيسية", href: "/" },
    { label: "عن الطبيب", href: "/about" },

    { label: "آراء المرضى", href: "#reviews" },
    { label: "تواصل معنا", href: "#footer" },
  ];

  return (
    <footer
      id="footer"
      dir="rtl"
      className="relative bg-gradient-to-b from-[#093a82] to-[#05234b] text-white overflow-hidden"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
          linear-gradient(#ffffff 1px, transparent 1px),
          linear-gradient(90deg, #ffffff 1px, transparent 1px)
        `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow effects */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[300px] w-[300px] rounded-full bg-[#075b9f]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-[300px] w-[300px] rounded-full bg-[#be0e10]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-5 lg:px-10">
        {/* Top Section */}
        <div className="grid gap-12 pb-12 border-b border-white/10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & About */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Link
              href="/"
              className="inline-block transition-opacity hover:opacity-85"
            >
              <Image
                src={logo}
                alt={doctor.name}
                width={200}
                height={60}
                className="h-auto w-[180px] object-contain brightness-200 contrast-200"
              />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              {doctor.description.slice(0, 100)}...
            </p>
            <div className="flex items-center gap-2">
              <HeartPulse className="h-4 w-4 text-[#ef3b3e]" />
              <span className="text-xs text-white/40">
                {doctor.title.toUpperCase()}
              </span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-bold tracking-wider text-white/80 mb-4">
              روابط سريعة
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-all hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 group"
                  >
                    <ChevronLeft className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info - Dynamic from doctor */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-bold tracking-wider text-white/80 mb-4">
              معلومات التواصل
            </h3>
            <ul className="space-y-3">
              {Object.values(contactInfo).map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="flex items-start gap-3 text-sm text-white/50 transition-all hover:text-white group"
                      >
                        <Icon className="h-4 w-4 mt-0.5 text-[#075b9f] group-hover:text-[#4a7db0] transition-colors flex-shrink-0" />
                        <span className="group-hover:underline">
                          {item.value}
                        </span>
                      </a>
                    ) : (
                      <div className="flex items-start gap-3 text-sm text-white/50">
                        <Icon className="h-4 w-4 mt-0.5 text-[#075b9f] flex-shrink-0" />
                        <span>{item.value}</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Working Hours & CTA */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-sm font-bold tracking-wider text-white/80 mb-4">
              احجز موعدك
            </h3>
            <div className="space-y-4">
              <p className="text-sm text-white/50 leading-relaxed">
                احصل على استشارة طبية متخصصة مع {doctor.name}
              </p>
              <Link
                href="/#booking"
                className="inline-flex items-center gap-2 rounded-full bg-[#be0e10] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#a00c0e] hover:-translate-y-0.5 shadow-lg shadow-[#be0e10]/25"
              >
                <CalendarDays className="h-4 w-4" />
                احجز موعدك الآن
              </Link>
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-[#075b9f]" />
                  <span className="text-white/40 text-xs">متاح 24/7 للحجز</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-6 pt-8 md:flex-row">
          {/* Social Links */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <span className="text-xs text-white/40">تابعنا على:</span>
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:text-white hover:border-transparent ${social.color}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </motion.div>{" "}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className=""
          >
            <div className="mt-3 flex items-center justify-center md:justify-start gap-2">
              <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#cda558]/50" />
              <a
                href="https://www.linkedin.com/in/al-hassan-soliman-/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-semibold text-white/40 transition-all hover:text-[#cda558] hover:underline"
              >
                Made by <span className="text-[#cda558]">Hulcode</span>
              </a>
              <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#cda558]/50" />
            </div>
          </motion.div>
          {/* Copyright + Made by */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center md:text-left"
          >
            <p className="text-xs text-white/30">
              &copy; {currentYear} {doctor.name} - {doctor.title}
            </p>
            <p className="text-[10px] text-white/20 mt-1">جميع الحقوق محفوظة</p>
          </motion.div>{" "}
        </div>
      </div>
    </footer>
  );
};

export default FooterContent;
