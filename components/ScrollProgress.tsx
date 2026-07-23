"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

/**
 * Sticky progress bar fixed to the very top of the viewport. Fills from
 * 0% to 100% as the page scrolls, reaching exactly 100% once the user
 * hits the bottom of the document (i.e. the footer). A light spring
 * smooths out the fill so fast scrolling doesn't look like a snap-jump.
 */
export default function ScrollProgress() {
  const [rawProgress, setRawProgress] = useState(0);
  const progress = useSpring(0, { stiffness: 300, damping: 40, mass: 0.3 });

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      setRawProgress(Math.min(1, Math.max(0, pct)));
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    progress.set(rawProgress);
  }, [rawProgress, progress]);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent"
    >
      <motion.div
        style={{ scaleX: progress, transformOrigin: "0% 50%" }}
        className="h-full w-full bg-primary"
      />
    </div>
  );
}
