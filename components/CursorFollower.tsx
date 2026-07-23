"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { CURSOR_EVENT, CursorEventDetail } from "@/lib/cursor-bus";

/**
 * Screen-wide mouse-following cursor bubble.
 * - Default state: a soft 16px ring trailing the cursor.
 * - Hover state: expands into a high-contrast dark bubble, optionally
 *   showing a short label ("View" / "Explore" / "Send"), whenever the
 *   pointer is over an element that spreads useCursorHover() onto itself.
 *
 * Hidden entirely on touch devices (no `pointer: fine` match), so nothing
 * lingers in the way of a tap.
 */
export default function CursorFollower() {
  const [variant, setVariant] = useState<"default" | "hover">("default");
  const [label, setLabel] = useState<string | undefined>(undefined);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 320, mass: 0.6 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mq.matches);
    const handleMQ = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mq.addEventListener("change", handleMQ);

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };

    const handleVariant = (e: Event) => {
      const detail = (e as CustomEvent<CursorEventDetail>).detail;
      setVariant(detail.variant);
      setLabel(detail.label);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener(CURSOR_EVENT, handleVariant as EventListener);

    return () => {
      mq.removeEventListener("change", handleMQ);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener(CURSOR_EVENT, handleVariant as EventListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isFinePointer || !visible) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] flex items-center justify-center"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        animate={{
          width: variant === "hover" ? (label ? 76 : 56) : 16,
          height: variant === "hover" ? (label ? 76 : 56) : 16,
          borderWidth: variant === "hover" ? "1.5px" : "1px",
          borderColor: variant === "hover" ? "#E2B883" : "rgba(226,184,131,0.5)",
          boxShadow: variant === "hover" ? "0 0 24px 4px rgba(226,184,131,0.25)" : "0 0 0 0 rgba(226,184,131,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24, mass: 0.5 }}
        className="flex items-center justify-center rounded-full border bg-transparent backdrop-blur-[1px]"
      >
        {variant === "hover" && label ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="select-none font-mono text-[11px] uppercase tracking-wide text-[#E2B883]"
          >
            {label}
          </motion.span>
        ) : null}
      </motion.div>
    </motion.div>
  );
}