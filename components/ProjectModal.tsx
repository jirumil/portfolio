"use client";

import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";
import Modal from "./Modal";
import type { Project } from "@/lib/projects";

const accentText: Record<Project["accent"], string> = {
  violet: "text-[#B8A9FF]",
  cyan: "text-[#8BE9F5]",
};

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
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
            className={`font-mono text-[11px] uppercase tracking-[0.16em] ${accentText[project.accent]}`}
          >
            {project.eyebrow}
          </span>
          <h2
            id="project-modal-title"
            className="mt-2 text-2xl font-semibold text-white"
          >
            {project.title}
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            {project.longDescription}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {project.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5"
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

          <div className="mt-6">
            <h3 className="font-mono text-xs uppercase tracking-wide text-white/45">
              Architecture breakdown
            </h3>
            <ul className="mt-3 space-y-2.5">
              {project.architecture.map((point) => (
                <li
                  key={point}
                  className="flex gap-2.5 text-sm leading-relaxed text-white/60"
                >
                  <span
                    className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${
                      project.accent === "violet" ? "bg-[#7C5CFF]" : "bg-[#22D3EE]"
                    }`}
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-white/60"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-7 flex items-center gap-5 border-t border-white/5 pt-6">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
              View source
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className={`inline-flex items-center gap-1.5 text-sm font-medium ${accentText[project.accent]} transition-opacity hover:opacity-80`}
            >
              <ExternalLink className="h-4 w-4" />
              Live deployment
            </a>
          </div>
        </>
      )}
    </Modal>
  );
}