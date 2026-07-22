"use client";

import { useState } from "react";
import { Lock, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon, MailIcon } from "./icons";
import LegalModal, { type LegalDoc } from "./LegalModal";

const QUICK_LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const [legalDoc, setLegalDoc] = useState<LegalDoc>(null);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#08080a] px-6 py-12 sm:px-10 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <span className="font-mono text-sm text-white/80">Jean Jeromel Hilanga</span>
          <p className="mt-2 text-xs leading-relaxed text-white/40">
            DevOps &amp; platform engineering, with roots in full-stack
            development and e-commerce systems.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://github.com/jirumil"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="text-white/40 transition-colors hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/jean-jeromel-hilanga-59b2333a0"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="text-white/40 transition-colors hover:text-white"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=jeanhilanga08@gmail.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Email"
              className="text-white/40 transition-colors hover:text-white"
            >
              <MailIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav className="flex gap-6">
          {QUICK_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs text-white/40 transition-colors hover:text-white/75"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
        <p className="font-mono text-xs text-white/35">
          © {year} Jean Jeromel Hilanga. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setLegalDoc("privacy")}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-white/35 transition-colors hover:text-white/70"
          >
            <Lock className="h-3 w-3" />
            Privacy Policy
          </button>
          <button
            onClick={() => setLegalDoc("terms")}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-white/35 transition-colors hover:text-white/70"
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