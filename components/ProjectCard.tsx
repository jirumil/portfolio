"use client";

import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";
import TechPill from "./TechPill";
import HoverBubble, { useHoverBubble } from "./HoverBubble";
import { cardHover } from "@/lib/motion";
import type { Project } from "@/lib/projects";

export default function ProjectCard({
  project,
  onExpand,
}: {
  project: Project;
  onExpand: (project: Project) => void;
}) {
  const { title, tags, description, status, githubUrl, liveUrl } = project;
  const isLive = status === "Live";
  const { bubbleProps, x, y, active } = useHoverBubble();

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onExpand(project);
    }
  }

  return (
    <motion.div
      {...bubbleProps}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
      onClick={() => onExpand(project)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Expand details for ${title}`}
      className="project-card-item group relative flex h-full cursor-pointer flex-col rounded-2xl border border-primary/20 bg-surface/60 p-6 backdrop-blur-sm outline-none transition-colors hover:border-primary/40 focus-visible:border-primary/60 sm:p-7"
    >
      <HoverBubble x={x} y={y} active={active} label="Tap to expand" />

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-semibold text-navy sm:text-2xl">
          {title}
        </h3>
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide ${
            isLive
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-navy/20 bg-navy/5 text-navy/50"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isLive ? "bg-primary" : "bg-navy/40"
            }`}
          />
          {status}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <TechPill key={tag} label={tag} />
        ))}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-navy/65">
        {description}
      </p>

      <div className="mt-auto flex items-center gap-5 pt-6">
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer noopener"
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 inline-flex items-center gap-1.5 text-sm font-medium text-navy/75 transition-colors hover:text-primary"
        >
          <GithubIcon className="h-4 w-4" />
          View Source
        </a>
        {isLive && liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-75"
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </a>
        )}

        <span className="ml-auto font-mono text-[11px] text-navy/35 transition-colors group-hover:text-primary">
          tap to expand
        </span>
      </div>
    </motion.div>
  );
}
