"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, type MotionValue } from "motion/react";

interface HoverBubbleProps {
  label?: string;
}

/**
 * Small themed badge that follows the pointer while it moves over the
 * wrapping card, then eases back out on leave. Mount this inside a
 * `relative` positioned parent and forward the parent's pointer events
 * to `onPointerMove` / `onPointerEnter` / `onPointerLeave`.
 *
 * Pointer-only by design — touch devices skip the follower entirely and
 * rely on the tap-to-expand affordance instead, so nothing sits in the
 * way of a tap.
 */
export function useHoverBubble() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.4 });
  const [active, setActive] = useState(false);
  const isTouch = useRef(false);

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  function onPointerEnter(e: React.PointerEvent<HTMLElement>) {
    isTouch.current = e.pointerType === "touch";
    if (!isTouch.current) setActive(true);
  }

  function onPointerLeave() {
    setActive(false);
  }

  return {
    bubbleProps: { onPointerMove, onPointerEnter, onPointerLeave },
    x: springX,
    y: springY,
    active,
  };
}

export default function HoverBubble({
  x,
  y,
  active,
  label = "View details",
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  active: boolean;
  label?: string;
}) {
  return (
    <motion.div
      aria-hidden
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.6 }}
      transition={{ duration: 0.18 }}
      className="pointer-events-none absolute left-0 top-0 z-20 hidden items-center gap-1.5 whitespace-nowrap rounded-full bg-navy px-4 py-2 font-mono text-[11px] uppercase tracking-wide text-background shadow-[0_8px_24px_-8px_rgba(17,45,78,0.5)] sm:flex"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {label}
    </motion.div>
  );
}
