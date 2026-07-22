"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/motion";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#08080a]/70 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-12 border-b transition-colors duration-300 ${
          scrolled ? "border-white/10" : "border-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] font-mono text-xs text-[#B8A9FF]">
            08
          </span>
          <span className="font-mono text-sm text-white/80">Jean Jeromel Hilanga</span>
        </a>

        <nav className="hidden items-center gap-8 sm:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/55 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="rounded-lg border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white"
        >
          Let's talk
        </a>
      </div>
    </motion.header>
  );
}