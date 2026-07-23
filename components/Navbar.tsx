"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/motion";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
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
      className={`fixed inset-x-0 top-[3px] z-40 transition-colors duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-12 border-b transition-colors duration-300 ${
          scrolled ? "border-primary/15" : "border-transparent"
        }`}
      >
        <a href="#top" className="font-mono text-sm font-medium text-navy">
          Jean Jeromel Hilanga
        </a>

        <nav className="hidden items-center gap-8 sm:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-navy/60 transition-colors hover:text-navy"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
