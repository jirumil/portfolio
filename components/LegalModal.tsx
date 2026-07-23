"use client";

import Modal from "./Modal";

export type LegalDoc = "privacy" | "terms" | null;

const CONTENT: Record<
  Exclude<LegalDoc, null>,
  { title: string; body: { heading: string; text: string }[] }
> = {
  privacy: {
    title: "Privacy Policy",
    body: [
      {
        heading: "What this site collects",
        text: "This portfolio does not use analytics or tracking cookies. The only personal data collected is what you choose to submit through the contact form: your name, email address, subject, and message.",
      },
      {
        heading: "Contact form data",
        text: "Submitting the contact form opens a pre-filled email draft in your own email client, addressed to jeanhilanga08@gmail.com. Your input is not stored on this site or on any server — it is only used to compose that email, sent from your own account, to respond to your message.",
      },
      {
        heading: "Hosting logs",
        text: "This site is hosted on Vercel, which may automatically log standard request metadata (such as IP address, browser type, and request timestamps) for security and performance purposes, in line with Vercel's own privacy policy.",
      },
      {
        heading: "Contact",
        text: "Questions about this policy can be sent to jeanhilanga08@gmail.com.",
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    body: [
      {
        heading: "Use of this site",
        text: "This portfolio is provided for informational purposes to showcase the work and background of Jean Jeromel Hilanga. Content, code samples, and project descriptions are shared as-is, without warranty of any kind.",
      },
      {
        heading: "Intellectual property",
        text: "All original content, design, and copy on this site are owned by Jean Jeromel Hilanga. Linked source repositories are governed by their own individual licenses as published on GitHub.",
      },
      {
        heading: "Changes",
        text: "These terms may be updated from time to time as this site evolves. Continued use of the site after changes constitutes acceptance of the updated terms.",
      },
    ],
  },
};

export default function LegalModal({
  doc,
  onClose,
}: {
  doc: LegalDoc;
  onClose: () => void;
}) {
  const active = doc ? CONTENT[doc] : null;

  return (
    <Modal open={!!doc} onClose={onClose} labelledBy="legal-modal-title">
      {active && (
        <>
          <h2 id="legal-modal-title" className="text-xl font-semibold text-navy">
            {active.title}
          </h2>
          <div className="mt-5 space-y-5">
            {active.body.map((section) => (
              <div key={section.heading}>
                <h3 className="font-mono text-xs uppercase tracking-wide text-primary">
                  {section.heading}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy/65">
                  {section.text}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </Modal>
  );
}
