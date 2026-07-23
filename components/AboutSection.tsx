"use client";

import { motion } from "motion/react";
import TechPill from "./TechPill";
import { fadeUp, staggerParent } from "@/lib/motion";

const SKILLS = [
  "TypeScript",
  "Next.js",
  "Node.js",
  "Docker",
  "Terraform",
  "CI/CD",
  "PHP",
  "MySQL",
  "MikroTik Networking",
  "Linux (WSL2)",
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative border-t border-primary/10 bg-background px-6 py-24 sm:px-10 lg:px-12"
    >
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <motion.div variants={fadeUp}>
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
            [ About ]
          </span>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-navy sm:text-4xl">
            Full-stack roots, platform-engineering focus.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-navy/65">
            My work spans full-stack development, cloud infrastructure, and
            CI/CD pipelines. I adapt quickly across various development
            environments — whether orchestrating Linux workflows in WSL,
            spinning up Node.js services, or managing legacy XAMPP stacks. I
            focus on writing maintainable code, containerizing applications
            with Docker, and building clean, responsive user interfaces.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col gap-6">
          <div className="rounded-2xl border border-white/10 bg-surface/60 p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
              Background
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-navy/70">
              <li>
                IT Support &amp; Network Technician internship at Licaland
                (Feb–Apr 2026) — FreePBX, MikroTik networking, CCTV, and
                hardware diagnostics.
              </li>
              <li>
                National Certificate II in Computer Systems Servicing
                (2023).
              </li>
              <li>
                Expected to graduate August 2027 with a BS in Information
                Technology.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-surface/60 p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
              Core skills
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <TechPill key={skill} label={skill} />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}