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
          <h2 className="mt-3 text-3xl font-semibold text-navy sm:text-4xl">
            Full-stack roots, platform-engineering focus.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-navy/65">
            I&apos;m a 4th-year BS Information Technology student at Rizal
            Technological University, building toward a role in DevOps and
            platform engineering. My work spans full-stack development,
            cloud infrastructure, and CI/CD — I develop on WSL2 and I&apos;m
            comfortable moving between application code and the
            infrastructure it runs on.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col gap-6">
          <div className="rounded-2xl border border-primary/20 bg-surface/60 p-6">
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

          <div className="rounded-2xl border border-primary/20 bg-surface/60 p-6">
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
