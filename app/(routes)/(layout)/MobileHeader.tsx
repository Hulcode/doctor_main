import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
const MobileHeader = ({
  isOpen,
  navLinks,
  closeMenu,
}: {
  isOpen: boolean;
  navLinks: { label: string; href: string; icon: LucideIcon }[];
  closeMenu: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="lg:hidden overflow-hidden border-t border-slate-200/70 bg-white/95 backdrop-blur-xl"
        >
          <nav className="flex flex-col gap-1 px-4 py-4 sm:px-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-[#075b9f]/5 hover:text-[#075b9f]"
                >
                  <link.icon className="h-4 w-4 text-[#cda558]" />
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Mobile CTA Button */}
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 pt-4 border-t border-slate-200/70"
            >
              <Link
                href="/#booking"
                onClick={closeMenu}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#062657] to-[#075b9f] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-[#062657]/20 transition-all hover:shadow-xl"
              >
                <CalendarDays className="h-4 w-4" />
                احجز موعدك الآن
              </Link>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileHeader;
