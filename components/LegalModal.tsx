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
        text: "This portfolio does not use analytics or tracking cookies by default. If a contact form or analytics integration is added later, this policy should be updated to describe exactly what's collected and why.",
      },
      {
        heading: "Contact form",
        text: "Information submitted through the contact form is used solely to respond to your message and is not shared with third parties or used for marketing.",
      },
      {
        heading: "Changes",
        text: "This is placeholder policy text — replace it with language reviewed for your actual data practices before this site handles real user data.",
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    body: [
      {
        heading: "Use of this site",
        text: "This portfolio is provided for informational purposes. Content, code samples, and project descriptions are shared as-is, without warranty.",
      },
      {
        heading: "Intellectual property",
        text: "Project write-ups and original content on this site belong to the site owner. Linked source repositories are governed by their own individual licenses.",
      },
      {
        heading: "Changes",
        text: "This is placeholder terms text — replace it with language appropriate to your actual site before launch.",
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
          <h2 id="legal-modal-title" className="text-xl font-semibold text-white">
            {active.title}
          </h2>
          <div className="mt-5 space-y-5">
            {active.body.map((section) => (
              <div key={section.heading}>
                <h3 className="font-mono text-xs uppercase tracking-wide text-[#8BE9F5]">
                  {section.heading}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">
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