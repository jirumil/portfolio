"use client";

import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";
import TechPill from "./TechPill";
import Modal from "./Modal";
import { useCursorHover } from "@/lib/cursor-bus";
import type { Project } from "@/lib/projects";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const sourceHover = useCursorHover("Source");
  const liveHover = useCursorHover("Live");

  return (
    <Modal
      open={!!project}
      onClose={onClose}
      labelledBy="project-modal-title"
      maxWidthClassName="max-w-2xl"
    >
      {project && (
        <>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide ${
              project.status === "Live"
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-navy/20 bg-navy/5 text-navy/50"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                project.status === "Live" ? "bg-primary" : "bg-navy/40"
              }`}
            />
            {project.status}
          </span>

          <h2
            id="project-modal-title"
            className="mt-3 text-2xl font-semibold text-navy"
          >
            {project.title}
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <TechPill key={tag} label={tag} />
            ))}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-navy/70">
            {project.longDescription}
          </p>

          <div className="mt-6">
            <h3 className="font-mono text-xs uppercase tracking-wide text-primary">
              Key features
            </h3>
            <ul className="mt-3 space-y-2.5">
              {project.features.map((point) => (
                <li
                  key={point}
                  className="flex gap-2.5 text-sm leading-relaxed text-navy/70"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="font-mono text-xs uppercase tracking-wide text-primary">
              Key takeaways
            </h3>
            <ul className="mt-3 space-y-2.5">
              {project.takeaways.map((point) => (
                <li
                  key={point}
                  className="flex gap-2.5 text-sm leading-relaxed text-navy/70"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-navy/40" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 flex items-center gap-5 border-t border-primary/15 pt-6">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              {...sourceHover}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-navy/75 transition-colors hover:text-accent-hover"
            >
              <GithubIcon className="h-4 w-4" />
              View Source
            </a>
            {project.status === "Live" && project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                {...liveHover}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-accent-hover"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}