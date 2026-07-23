"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { modalBackdrop, modalPanel } from "@/lib/motion";
import { useCursorHover } from "@/lib/cursor-bus";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  labelledBy: string;
  maxWidthClassName?: string;
}

/**
 * Shared modal shell — backdrop + panel + Escape-to-close + scroll lock.
 * Used by the legal drawers (Privacy/Terms).
 */
export default function Modal({
  open,
  onClose,
  children,
  labelledBy,
  maxWidthClassName = "max-w-lg",
}: ModalProps) {
  const closeHover = useCursorHover();

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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/40 backdrop-blur-sm px-6"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            variants={modalPanel}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full ${maxWidthClassName} max-h-[85vh] overflow-y-auto rounded-2xl border border-primary/20 bg-background p-6 shadow-[0_20px_60px_-15px_rgba(17,17,17,0.25)] sm:p-8`}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              {...closeHover}
              className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-surface text-navy/60 transition-colors hover:border-primary/40 hover:text-navy"
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
