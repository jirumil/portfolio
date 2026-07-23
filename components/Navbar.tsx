"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { useCursorHover } from "@/lib/cursor-bus";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const hoverProps = useCursorHover();
  return (
    <a
      href={href}
      onClick={onClick}
      {...hoverProps}
      className="text-sm text-navy/60 transition-colors hover:text-accent-hover"
    >
      {label}
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const nameHover = useCursorHover();
  const menuHover = useCursorHover();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open, and close it if the
  // viewport grows back past the sm breakpoint (e.g. rotating a tablet).
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.header
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={`fixed inset-x-0 top-[3px] z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "bg-background/85 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-12 border-b transition-colors duration-300 ${
          scrolled || menuOpen ? "border-primary/15" : "border-transparent"
        }`}
      >
        <a
          href="#top"
          {...nameHover}
          onClick={() => setMenuOpen(false)}
          className="font-mono text-sm font-medium text-navy"
        >
          Jean Jeromel Hilanga
        </a>

        <nav className="hidden items-center gap-8 sm:flex">
          {LINKS.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          {...menuHover}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-navy transition-colors hover:border-accent-hover hover:text-accent-hover sm:hidden"
        >
          {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-primary/15 bg-background/95 backdrop-blur-lg sm:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-2 py-3 text-base text-navy/70 transition-colors hover:bg-surface hover:text-accent-hover"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}