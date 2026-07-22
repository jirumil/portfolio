"use client";

import { useState } from "react";
import ScrollTimeline from "./ScrollTimeline";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { PROJECTS, type Project } from "@/lib/projects";

export default function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section
      id="work"
      className="relative border-t border-white/5 bg-[#08080a] px-6 py-24 sm:px-10 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-xl">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/40">
            Selected work
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-white">
            Two stacks, one build discipline.
          </h2>
          <p className="mt-3 text-sm text-white/45">
            Click a project for the full breakdown.
          </p>
        </div>

        <ScrollTimeline
          itemSelector=".project-card-item"
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={setSelected}
              floatDelay={i * 0.6}
            />
          ))}
        </ScrollTimeline>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}