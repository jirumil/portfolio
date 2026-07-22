"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import TerminalBadge from "./TerminalBadge";
import { heroWordContainer, heroWord, fadeUp, staggerParent } from "@/lib/motion";

// Inline GitHub Icon Component
function Github({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

// Inline LinkedIn Icon Component
function Linkedin({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 1 0 0 2.94 1.47 1.47 0 0 0 0-2.94z" />
    </svg>
  );
}

const HEADLINE = "Infrastructure that scales. Storefronts that convert.";

function AnimatedHeadline({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.h1
      variants={heroWordContainer}
      initial="hidden"
      animate="visible"
      style={{ perspective: 800 }}
      className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.05]"
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.28em]">
          <motion.span variants={heroWord} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

/** Small glassmorphic icon-link used for the GitHub / LinkedIn CTAs. */
function IconLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/70 backdrop-blur-md transition-all hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
    >
      {icon}
    </a>
  );
}

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const orbX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const orbY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handlePointerMove = (e: React.PointerEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX - innerWidth / 2) * 0.15);
    mouseY.set((clientY - innerHeight / 2) * 0.15);
  };

  return (
    <section
      onPointerMove={handlePointerMove}
      className="relative isolate min-h-[100vh] w-full overflow-hidden bg-[#0a0a0a]"
    >
      {/* Glowing gradient backdrop — two soft orbs, violet + cyan */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          style={{ x: orbX, y: orbY }}
          className="absolute left-1/2 top-[-10%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,92,255,0.32),transparent_70%)] blur-3xl"
        />
        <motion.div
          style={{ x: useTransform(orbX, (v) => -v), y: useTransform(orbY, (v) => -v) }}
          className="absolute right-[-10%] bottom-[-10%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.22),transparent_70%)] blur-3xl"
        />
        {/* Faint grid texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
      </div>

      <div className="mx-auto flex min-h-[100vh] max-w-6xl flex-col justify-center gap-8 px-6 py-28 sm:px-10 lg:px-12">
        <AnimatedHeadline text={HEADLINE} />

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="max-w-xl text-base sm:text-lg text-white/60"
        >
          I build and ship two kinds of systems: infrastructure-as-code
          driven cloud pipelines, and high-performance e-commerce platforms
          handling real transactions. Same discipline, different layer of
          the stack.
        </motion.p>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center gap-4"
        >
          <motion.a
            variants={fadeUp}
            href="#projects"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-[#0a0a0a] transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            View projects
          </motion.a>
          <motion.a
            variants={fadeUp}
            href="#contact"
            className="rounded-lg border border-white/15 bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white"
          >
            Get in touch
          </motion.a>

          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <IconLink
              href="https://github.com/jirumil"
              label="GitHub profile"
              icon={<Github className="h-4 w-4" />}
            />
            <IconLink
              href="https://www.linkedin.com/in/jean-jeromel-hilanga-59b2333a0"
              label="LinkedIn profile"
              icon={<Linkedin className="h-4 w-4" />}
            />
          </motion.div>
        </motion.div>

        <div className="w-full max-w-md pt-4">
          <TerminalBadge />
        </div>

        <motion.a
          href="#projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-4 inline-flex items-center gap-2 self-start font-mono text-xs text-white/35 transition-colors hover:text-white/60"
        >
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          scroll
        </motion.a>
      </div>
    </section>
  );
}