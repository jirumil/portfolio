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
      className={`group relative w-full max-w-md rounded-xl border border-[#DCD7C9]/12 bg-[#3F4E4F]/70 backdrop-blur-md shadow-[0_0_0_1px_rgba(162,123,92,0.08)] ${className}`}
    >
      {/* Ambient glow ring behind the terminal */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-xl opacity-50 blur-md transition-opacity duration-500 group-hover:opacity-90"
        style={{
          background:
            "linear-gradient(120deg, rgba(162,123,92,0.28), rgba(220,215,201,0.14), rgba(162,123,92,0.12))",
        }}
      />

      <div className="relative rounded-xl overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-[#DCD7C9]/10 bg-[#2C3639]/40 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#A27B5C]/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#DCD7C9]/35" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#A27B5C]/70" />
          <span className="ml-2 font-mono text-[11px] tracking-wide text-[#DCD7C9]/45">
            zsh — portfolio
          </span>

          {/* Interactive status tag — subtle glowing pulse */}
          <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-[#A27B5C]">
            <span className="relative flex h-1.5 w-1.5">
              <motion.span
                aria-hidden
                animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inline-flex h-full w-full rounded-full bg-[#A27B5C]"
              />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#A27B5C]" />
            </span>
            available for work
          </span>
        </div>

        {/* Body */}
        <div className="px-4 py-4 font-mono text-[13px] leading-relaxed">
          <div className="flex items-center text-[#DCD7C9]/90">
            <span className="mr-2 text-[#A27B5C]">➜</span>
            <span className="mr-2 text-[#DCD7C9]/60">~/portfolio</span>
            <span>{typed}</span>
            <span
              aria-hidden
              className="ml-0.5 inline-block h-[15px] w-[7px] translate-y-[1px] bg-[#A27B5C] animate-pulse"
            />
          </div>

          <div className="mt-2 space-y-1">
            {lines.slice(0, visibleLines).map((line, idx) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.02 }}
                className="text-[#DCD7C9]/50"
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