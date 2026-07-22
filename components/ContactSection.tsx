"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { GithubIcon, LinkedinIcon, MailIcon } from "./icons";
import { fadeUp, staggerParent } from "@/lib/motion";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire this up to your form handler of choice (Formspree, a Next.js
    // route handler, Resend, etc.) — left as a client-side stub so the
    // section is fully styled and ready to connect.
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="relative border-t border-white/5 bg-[#08080a] px-6 py-24 sm:px-10 lg:px-12"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-[-10%] top-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),transparent_72%)] blur-[100px]" />
      </div>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2"
      >
        <motion.div variants={fadeUp}>
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/40">
            Contact
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-white">
            Let's build something.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
            Open to DevOps and platform engineering roles, and happy to talk
            through any of the projects above in more depth.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=jeanhilanga08@gmail.com"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex w-fit items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-white"
            >
              <MailIcon className="h-4 w-4" />
              jeanhilanga08@gmail.com
            </a>
            <a
              href="https://github.com/jirumil"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex w-fit items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
             github.com/jirumil
            </a>
            <a
              href="https://www.linkedin.com/in/jean-jeromel-hilanga-59b2333a0"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex w-fit items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-white"
            >
              <LinkedinIcon className="h-4 w-4" />
              linkedin.com/in/jean-jeromel-hilanga
            </a>
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm sm:p-7"
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="font-mono text-xs text-white/45">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#7C5CFF]/50"
                placeholder="Jane Cruz"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-mono text-xs text-white/45">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#7C5CFF]/50"
                placeholder="jane@company.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="font-mono text-xs text-white/45">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="resize-none rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#7C5CFF]/50"
                placeholder="What are you looking to build?"
              />
            </div>

            <button
              type="submit"
              className="mt-1 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-[#08080a] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {submitted ? "Sent — thank you" : "Send message"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}