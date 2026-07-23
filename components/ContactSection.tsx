"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { GithubIcon, LinkedinIcon, MailIcon } from "./icons";
import { fadeUp, staggerParent } from "@/lib/motion";
import { useCursorHover } from "@/lib/cursor-bus";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  const mailHover = useCursorHover();
  const githubHover = useCursorHover();
  const linkedinHover = useCursorHover();
  const submitHover = useCursorHover("Send");

  function validate(values: FormState): FormErrors {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!EMAIL_RE.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.subject.trim()) next.subject = "Please enter a subject.";
    if (!values.message.trim()) next.message = "Please enter a message.";
    return next;
  }

  function handleChange(field: keyof FormState) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setSent(false);
    };
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = `Portfolio Inquiry from ${form.name}: ${form.subject}`;
    const body = `From: ${form.name} (${form.email})\n\n${form.message}`;
    const gmailUrl =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      "&to=jeanhilanga08@gmail.com" +
      `&subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    setSent(true);
  }

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
        className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2"
      >
        <motion.div variants={fadeUp}>
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
            [ Contact ]
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-navy sm:text-4xl">
            Let&apos;s build something.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-navy/65">
            Open to web development, full-stack, and DevOps-adjacent roles,
            and happy to talk through any of the projects above in more
            depth.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=jeanhilanga08@gmail.com"
              target="_blank"
              rel="noreferrer noopener"
              {...mailHover}
              className="inline-flex w-fit items-center gap-2.5 text-sm text-navy/70 transition-colors hover:text-primary"
            >
              <MailIcon className="h-4 w-4" />
              jeanhilanga08@gmail.com
            </a>
            <a
              href="https://github.com/jirumil"
              target="_blank"
              rel="noreferrer noopener"
              {...githubHover}
              className="inline-flex w-fit items-center gap-2.5 text-sm text-navy/70 transition-colors hover:text-primary"
            >
              <GithubIcon className="h-4 w-4" />
              github.com/jirumil
            </a>
            <a
              href="https://www.linkedin.com/in/jean-jeromel-hilanga-59b2333a0"
              target="_blank"
              rel="noreferrer noopener"
              {...linkedinHover}
              className="inline-flex w-fit items-center gap-2.5 text-sm text-navy/70 transition-colors hover:text-primary"
            >
              <LinkedinIcon className="h-4 w-4" />
              linkedin.com/in/jean-jeromel-hilanga
            </a>
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4 rounded-2xl border border-primary/10 bg-surface p-6 sm:p-7"
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="font-mono text-xs text-navy/60">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange("name")}
                className="rounded-lg border border-primary/20 bg-background px-3.5 py-2.5 text-sm text-navy placeholder:text-navy/30 outline-none transition-colors focus:border-primary"
                placeholder="Jane Cruz"
              />
              {errors.name && (
                <p className="text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-mono text-xs text-navy/60">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                className="rounded-lg border border-primary/20 bg-background px-3.5 py-2.5 text-sm text-navy placeholder:text-navy/30 outline-none transition-colors focus:border-primary"
                placeholder="jane@company.com"
              />
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="subject"
                className="font-mono text-xs text-navy/60"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange("subject")}
                className="rounded-lg border border-primary/20 bg-background px-3.5 py-2.5 text-sm text-navy placeholder:text-navy/30 outline-none transition-colors focus:border-primary"
                placeholder="Internship opportunity"
              />
              {errors.subject && (
                <p className="text-xs text-red-600">{errors.subject}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="font-mono text-xs text-navy/60"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange("message")}
                rows={4}
                className="resize-none rounded-lg border border-primary/20 bg-background px-3.5 py-2.5 text-sm text-navy placeholder:text-navy/30 outline-none transition-colors focus:border-primary"
                placeholder="What are you looking to build?"
              />
              {errors.message && (
                <p className="text-xs text-red-600">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              {...submitHover}
              className="mt-1 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Send Message
            </button>

            {sent && (
              <p className="text-center text-xs font-medium text-primary">
                Message drafted in your email app!
              </p>
            )}
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}
