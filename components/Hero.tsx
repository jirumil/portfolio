"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { fadeUp, staggerParent } from "@/lib/motion";
import { useCursorHover } from "@/lib/cursor-bus";

export default function Hero() {
  const viewWorkHover = useCursorHover("Go");
  const contactHover = useCursorHover("Go");
  const resumeHover = useCursorHover("Open");
  const scrollHover = useCursorHover();
  return (
    <section
      id="top"
      className="relative isolate min-h-[100vh] w-full overflow-hidden bg-background"
    >
      {/* Faint dot-grid texture — quiet, editorial, not a glow-orb hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(17,17,17,0.14) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        animate="visible"
        className="mx-auto flex min-h-[100vh] max-w-6xl flex-col justify-center gap-6 px-6 py-32 sm:px-10 lg:px-12"
      >
        {/* Role Badge */}
        <motion.span
          variants={fadeUp}
          className="inline-flex w-fit items-center rounded-full border border-primary/25 bg-surface px-4 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-navy/70"
        >
          [ Web Developer / Practicing Full-Stack &amp; DevOps ]
        </motion.span>

        {/* Name */}
        <motion.p
          variants={fadeUp}
          className="font-mono text-sm uppercase tracking-[0.2em] text-primary"
        >
          Jean Jeromel Hilanga
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-6xl"
        >
          Building fast, reliable web applications and keeping production
          stable on Fridays.
        </motion.h1>

        {/* Bio */}
        <motion.p
          variants={fadeUp}
          className="max-w-xl text-base leading-relaxed text-navy/65 sm:text-lg"
        >
          Hey! I&apos;m Jean — a web developer actively expanding into
          full-stack architecture and DevOps workflows. I turn complex
          backends and e-commerce systems into smooth, reliable user
          experiences. When I&apos;m not configuring CI/CD pipelines,
          containerizing apps, or tracking down edge cases, I&apos;m probably
          figuring out why CSS is centering things sideways.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="mt-2 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            {...viewWorkHover}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            View Work
          </a>
          <a
            href="#contact"
            {...contactHover}
            className="rounded-full border border-primary/15 bg-surface px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:border-primary/30 hover:bg-surface-strong"
          >
            Get in Touch
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer noopener"
            {...resumeHover}
            className="inline-flex items-center gap-1 px-1 text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-navy"
          >
            Download Resume ↗
          </a>
        </motion.div>

        <motion.a
          href="#work"
          variants={fadeUp}
          {...scrollHover}
          className="mt-6 inline-flex w-fit items-center gap-2 font-mono text-xs text-navy/40 transition-colors hover:text-primary"
        >
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          scroll
        </motion.a>
      </motion.div>
    </section>
  );
}
