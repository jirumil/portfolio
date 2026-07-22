"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface TerminalBadgeProps {
  command?: string;
  lines?: string[];
  className?: string;
}

/**
 * Glowing terminal-style badge. Types out a command, then reveals a
 * sequence of "output" lines with a staggered delay. Cursor keeps
 * blinking indefinitely once typing completes.
 *
 * Purely client-side (setInterval-driven), so it's marked "use client"
 * and safe to drop straight into a server-rendered page.
 */
export default function TerminalBadge({
  command = "uipro init --ai claude",
  lines = [
    "✓ resolving identity.config",
    "✓ mounting devops/ + ecommerce/",
    "✓ ready in 128ms",
  ],
  className = "",
}: TerminalBadgeProps) {
  const [typed, setTyped] = useState("");
  const [doneTyping, setDoneTyping] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      i += 1;
      setTyped(command.slice(0, i));
      if (i >= command.length) {
        clearInterval(typeInterval);
        setDoneTyping(true);
      }
    }, 45);
    return () => clearInterval(typeInterval);
  }, [command]);

  useEffect(() => {
    if (!doneTyping) return;
    if (visibleLines >= lines.length) return;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 260);
    return () => clearTimeout(t);
  }, [doneTyping, visibleLines, lines.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className={`group relative w-full max-w-md rounded-xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md shadow-[0_0_0_1px_rgba(124,92,255,0.08)] ${className}`}
    >
      {/* Ambient glow ring behind the terminal */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-xl opacity-60 blur-md transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(120deg, rgba(124,92,255,0.35), rgba(34,211,238,0.25), rgba(124,92,255,0.15))",
        }}
      />

      <div className="relative rounded-xl overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]/70" />
          <span className="ml-2 font-mono text-[11px] tracking-wide text-white/40">
            JJH's — portfolio
          </span>
        </div>

        {/* Body */}
        <div className="px-4 py-4 font-mono text-[13px] leading-relaxed">
          <div className="flex items-center text-white/90">
            <span className="mr-2 text-[#7C5CFF]">➜</span>
            <span className="mr-2 text-[#22D3EE]">~/portfolio</span>
            <span>{typed}</span>
            <span
              aria-hidden
              className="ml-0.5 inline-block h-[15px] w-[7px] translate-y-[1px] bg-[#7C5CFF] animate-pulse"
            />
          </div>

          <div className="mt-2 space-y-1">
            {lines.slice(0, visibleLines).map((line, idx) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.02 }}
                className="text-white/50"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}