"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Menu,
  X,
  Home,
  User,
  MessageSquare,
  Mail,
} from "lucide-react";
import logo from "../../../public/noBg.png";
import { useState } from "react";

import MobileHeader from "./MobileHeader";

const navLinks = [
  {
    label: "الرئيسية",
    href: "/",
    icon: Home,
  },
  {
    label: "عن الطبيب",
    href: "/about",
    icon: User,
  },
  {
    label: "آراء المرضى",
    href: "/reviews",
    icon: MessageSquare,
  },
  {
    label: "تواصل معنا",
    href: "#footer",
    icon: Mail,
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl shadow-sm"
    >
      <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Logo - Responsive size */}
        <Link
          href="/"
          className="transition-opacity hover:opacity-85 flex-shrink-0"
          onClick={closeMenu}
        >
          <Image
            src={logo}
            alt="د. أحمد حسن سليمان"
            width={430}
            height={130}
            priority
            className="h-auto w-[150px] object-contain sm:w-[200px] md:w-[240px] lg:w-[290px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-slate-700 transition-colors hover:text-[#075b9f]"
            >
              {link.label}
              {/* Gold underline on hover */}
              <span className="absolute -bottom-1 right-0 h-0.5 w-0 bg-gradient-to-l from-[#cda558] to-[#e8c97e] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop Book Button */}
        <Link
          href="/#booking"
          className="hidden items-center gap-2 rounded-full bg-[#062657] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#062657]/20 transition-all hover:-translate-y-0.5 hover:bg-[#075b9f] hover:shadow-xl lg:flex"
        >
          <CalendarDays className="h-4 w-4" />
          احجز موعدك
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          aria-label="فتح القائمة"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-800 transition-colors hover:bg-slate-50 lg:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <MobileHeader isOpen={isOpen} navLinks={navLinks} closeMenu={closeMenu} />
    </header>
  );
};

export default Header;
