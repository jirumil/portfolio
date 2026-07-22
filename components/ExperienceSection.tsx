"use client";

import { motion } from "motion/react";
import { fadeUp, staggerParent } from "@/lib/motion";

const MILESTONES = [
  {
    period: "2023",
    title: "National Certificate II — Computer Systems Servicing",
    description:
      "Completed NC II certification covering hardware diagnostics, systems servicing, and foundational networking.",
  },
  {
    period: "Feb – Apr 2026",
    title: "IT Support & Network Technician Intern — Licaland",
    description:
      "Hands-on with FreePBX, MikroTik networking, CCTV systems, and hardware diagnostics in a production support environment.",
  },
  {
    period: "Expected Aug 2027",
    title: "BS Information Technology — Rizal Technological University",
    description:
      "4th-year standing, building toward DevOps and platform engineering — full-stack development, cloud infrastructure, and CI/CD.",
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative border-t border-white/5 bg-[#08080a] px-6 py-24 sm:px-10 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-xl">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/40">
            Experience
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-white">
            Milestones so far.
          </h2>
        </div>

        <motion.ol
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative border-l border-white/10 pl-8"
        >
          {MILESTONES.map((m) => (
            <motion.li key={m.title} variants={fadeUp} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-[#7C5CFF] shadow-[0_0_0_4px_rgba(124,92,255,0.15)]" />
              <span className="font-mono text-xs uppercase tracking-wide text-[#8BE9F5]">
                {m.period}
              </span>
              <h3 className="mt-1.5 text-lg font-semibold text-white">
                {m.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
                {m.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}