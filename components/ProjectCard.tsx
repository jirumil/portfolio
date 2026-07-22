"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";
import TechPill from "./TechPill";
import { cardHover, infiniteFloat } from "@/lib/motion";
import type { Project } from "@/lib/projects";

const accentMap = {
  violet: {
    ring: "rgba(124,92,255,0.45)",
    text: "text-[#B8A9FF]",
    glow: "rgba(124,92,255,0.25)",
    thumb: "linear-gradient(135deg, rgba(124,92,255,0.22), rgba(124,92,255,0.03))",
  },
  cyan: {
    ring: "rgba(34,211,238,0.45)",
    text: "text-[#8BE9F5]",
    glow: "rgba(34,211,238,0.22)",
    thumb: "linear-gradient(135deg, rgba(34,211,238,0.18), rgba(34,211,238,0.03))",
  },
};

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  /** Delay offset (seconds) for the ambient float so cards don't move
   *  in lockstep — pass a different value per card, e.g. index * 0.6. */
  floatDelay?: number;
}

export default function ProjectCard({
  project,
  onSelect,
  floatDelay = 0,
}: ProjectCardProps) {
  const {
    eyebrow,
    title,
    description,
    stats,
    stack,
    githubUrl,
    liveUrl,
    accent,
    icon: Icon,
  } = project;
  const colors = accentMap[accent];
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle tilt tied to pointer position, on top of the existing
  // cardHover lift/scale from lib/motion.ts — the two are kept on
  // separate transform axes (rotateX/rotateY here, y/scale in
  // cardHover) so they compose instead of fighting.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 220, damping: 22 });
  const springTiltY = useSpring(tiltY, { stiffness: 220, damping: 22 });
  const rotateX = useTransform(springTiltY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springTiltX, [-0.5, 0.5], [-6, 6]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(project);
    }
  }

  return (
    <motion.div
      variants={infiniteFloat(floatDelay)}
      animate="animate"
      className="project-card-item"
    >
      <motion.div
        ref={cardRef}
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={cardHover}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(project)}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${title}`}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm outline-none focus-visible:border-white/30"
      >
        {/* Hover glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-24 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${colors.glow}, transparent 60%)`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: `0 0 0 1px ${colors.ring}` }}
        />

        {/* Thumbnail — soft mesh glow behind the project icon, zooms slightly on hover */}
        <div className="relative h-40 w-full overflow-hidden border-b border-white/5">
          <div
            className="absolute inset-0 scale-100 transition-transform duration-500 ease-out group-hover:scale-110"
            style={{ background: colors.thumb }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon
              className={`h-10 w-10 ${colors.text} opacity-80 transition-transform duration-500 group-hover:scale-110`}
              strokeWidth={1.5}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent" />
        </div>

        <div className="relative flex h-full flex-col p-6 sm:p-7">
          <span
            className={`font-mono text-[11px] uppercase tracking-[0.16em] ${colors.text}`}
          >
            {eyebrow}
          </span>

          <h3 className="mt-3 text-xl sm:text-2xl font-semibold text-white">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-white/60">
            {description}
          </p>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-2"
              >
                <div className="font-mono text-sm font-medium text-white">
                  {s.value}
                </div>
                <div className="mt-0.5 text-[10px] uppercase tracking-wide text-white/40">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <TechPill key={tech} label={tech} />
            ))}
          </div>

          <div className="mt-auto flex items-center gap-4 pt-6">
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 inline-flex items-center gap-1.5 text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
              View source
            </a>
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              onClick={(e) => e.stopPropagation()}
              className={`relative z-10 inline-flex items-center gap-1.5 text-sm font-medium ${colors.text} transition-opacity hover:opacity-80`}
            >
              <ExternalLink className="h-4 w-4" />
              Live deployment
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}


