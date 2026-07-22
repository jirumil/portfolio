"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { modalBackdrop, modalPanel } from "@/lib/motion";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  labelledBy: string;
  maxWidthClassName?: string;
}

/**
 * Shared modal shell — backdrop + panel + Escape-to-close + scroll lock.
 * Used by both the legal drawers (Privacy/Terms) and the project focus
 * view, so open/close motion stays identical across the site.
 */
export default function Modal({
  open,
  onClose,
  children,
  labelledBy,
  maxWidthClassName = "max-w-lg",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={modalBackdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#08080a]/80 backdrop-blur-sm px-6"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            variants={modalPanel}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full ${maxWidthClassName} max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0c0c0f] p-6 sm:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-15px_rgba(0,0,0,0.6)]`}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/50 transition-colors hover:border-white/25 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}