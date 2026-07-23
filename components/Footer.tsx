"use client";

import { useState } from "react";
import { Lock, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon, MailIcon } from "./icons";
import LegalModal, { type LegalDoc } from "./LegalModal";
import { useCursorHover } from "@/lib/cursor-bus";

const QUICK_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function FooterNavLink({ href, label }: { href: string; label: string }) {
  const hoverProps = useCursorHover();
  return (
    <a
      href={href}
      {...hoverProps}
      className="font-mono text-xs text-navy/50 transition-colors hover:text-primary"
    >
      {label}
    </a>
  );
}

export default function Footer() {
  const [legalDoc, setLegalDoc] = useState<LegalDoc>(null);
  const year = new Date().getFullYear();
  const githubHover = useCursorHover();
  const linkedinHover = useCursorHover();
  const mailHover = useCursorHover();
  const privacyHover = useCursorHover();
  const termsHover = useCursorHover();

  return (
    <footer className="border-t border-primary/10 bg-background px-6 py-12 sm:px-10 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-sm text-navy">
              Jean Jeromel Hilanga
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-surface/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-navy/60">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Manila, PH
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-navy/50">
            Web developer expanding into full-stack architecture and DevOps
            workflows.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://github.com/jirumil"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              {...githubHover}
              className="text-navy/50 transition-colors hover:text-primary"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/jean-jeromel-hilanga-59b2333a0"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              {...linkedinHover}
              className="text-navy/50 transition-colors hover:text-primary"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=jeanhilanga08@gmail.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Email"
              {...mailHover}
              className="text-navy/50 transition-colors hover:text-primary"
            >
              <MailIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav className="flex gap-6">
          {QUICK_LINKS.map((link) => (
            <FooterNavLink key={link.href} {...link} />
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-primary/10 pt-6 sm:flex-row">
        <p className="font-mono text-xs text-navy/40">
          © {year} Jean Jeromel Hilanga. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setLegalDoc("privacy")}
            {...privacyHover}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-navy/40 transition-colors hover:text-primary"
          >
            <Lock className="h-3 w-3" />
            Privacy Policy
          </button>
          <button
            onClick={() => setLegalDoc("terms")}
            {...termsHover}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-navy/40 transition-colors hover:text-primary"
          >
            <FileText className="h-3 w-3" />
            Terms of Service
          </button>
        </div>
      </div>

      <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)} />
    </footer>
  );
}
