"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollTimelineProps {
  children: ReactNode;
  /** CSS selector, scoped to this wrapper, for the items to stagger in. */
  itemSelector: string;
  className?: string;
}

/**
 * Wraps a section and drives a GSAP ScrollTrigger timeline that staggers
 * its children in as the section enters the viewport. This is deliberately
 * kept separate from the Framer Motion hover states on the cards
 * themselves — GSAP owns the one-time scroll-in timeline, Motion owns
 * the ongoing per-card gesture interactions. Mixing the two engines for
 * the same property on the same element causes fights over transforms,
 * so the boundary is: GSAP animates opacity/y on the section wrapper only,
 * Motion animates transform/scale on the card root.
 */
export default function ScrollTimeline({
  children,
  itemSelector,
  className = "",
}: ScrollTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const items = el.querySelectorAll(itemSelector);
    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 48 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          once: true,
        },
      });

      tl.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.15,
      });
    }, el);

    return () => ctx.revert();
  }, [itemSelector]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}