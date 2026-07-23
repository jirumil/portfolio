"use client";

import type { ComponentType } from "react";
import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon, MailIcon } from "./icons";
import { fadeUp, staggerParent, cardHover } from "@/lib/motion";
import { useCursorHover } from "@/lib/cursor-bus";

interface ContactLink {
  key: string;
  label: string;
  value: string;
  action: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  cursorLabel: string;
}

const LINKS: ContactLink[] = [
  {
    key: "email",
    label: "Email",
    value: "jeanhilanga08@gmail.com",
    action: "Write to me",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=jeanhilanga08@gmail.com",
    icon: MailIcon,
    cursorLabel: "Send",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: "/in/jean-jeromel-hilanga",
    action: "Connect",
    href: "https://www.linkedin.com/in/jean-jeromel-hilanga-59b2333a0",
    icon: LinkedinIcon,
    cursorLabel: "Connect",
  },
  {
    key: "github",
    label: "GitHub",
    value: "@jirumil",
    action: "View profile",
    href: "https://github.com/jirumil",
    icon: GithubIcon,
    cursorLabel: "View",
  },
];

function ContactCard({ link }: { link: ContactLink }) {
  const Icon = link.icon;
  const hoverProps = useCursorHover(link.cursorLabel);

  return (
    <motion.a
      href={link.href}
      target={link.href.startsWith("http") ? "_blank" : undefined}
      rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
      {...hoverProps}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
      className="group flex flex-col justify-between gap-8 rounded-2xl border border-white/10 bg-[#121214] p-5 outline-none transition-colors duration-300 hover:border-[#E2B883] focus-visible:border-[#E2B883]"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-navy/45">
          {link.label}
        </span>
        <Icon className="h-4 w-4 text-navy/40 transition-colors group-hover:text-[#E2B883]" />
      </div>

      <div>
        <p className="truncate text-sm text-white">{link.value}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-navy/50 transition-colors group-hover:text-[#E2B883]">
          {link.action}
          <span aria-hidden className="translate-y-[-1px]">
            ↗
          </span>
        </span>
      </div>
    </motion.a>
  );
}

export default function ContactSection() {
  const conversationHover = useCursorHover("Email");
  const resumeHover = useCursorHover("Download");

  return (
    <section
      id="contact"
      className="relative border-t border-primary/10 bg-background px-6 py-24 sm:px-10 lg:px-12"
    >
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.span
          variants={fadeUp}
          className="font-mono text-xs uppercase tracking-[0.16em] text-primary"
        >
          [ Contact ]
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="mt-4 text-3xl font-semibold text-navy sm:text-4xl"
        >
          Let&apos;s build something.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-md text-sm leading-relaxed text-navy/65"
        >
          Open to web development, full-stack, and DevOps-adjacent roles, and
          happy to talk through any of the projects above in more depth.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {LINKS.map((link) => (
            <ContactCard key={link.key} link={link} />
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=jeanhilanga08@gmail.com"
            target="_blank"
            rel="noreferrer noopener"
            {...conversationHover}
            className="rounded-full bg-[#E2B883] px-6 py-3 text-sm font-medium text-[#0A0A0C] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Start a conversation
          </a>
          <a
            href="/RESUME-HILANGA.pdf"
            download="RESUME-HILANGA.pdf"
            target="_blank"
            rel="noopener noreferrer"
            {...resumeHover}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm text-white transition-colors hover:border-[#E2B883] hover:text-[#E2B883]"
>
  Download resume
  <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}