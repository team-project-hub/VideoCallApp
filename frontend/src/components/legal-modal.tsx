"use client";

import { X } from "lucide-react";

type LegalModalProps = {
  open: boolean;
  onClose: () => void;
};

export function LegalModal({ open, onClose }: LegalModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/50 px-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="legal-title" onClick={onClose}>
      <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between gap-4"><h2 id="legal-title" className="text-xl font-semibold">Terms and Privacy</h2><button type="button" onClick={onClose} className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" aria-label="Close legal information"><X className="h-4 w-4" /></button></div>
        <div className="mt-5 grid gap-6 text-sm leading-6 text-muted-foreground"><section><h3 className="font-semibold text-foreground">Terms and Conditions</h3><p className="mt-2">Meetly helps teams communicate through video calls, shared code, chat, and notes. Use Meetly responsibly, keep your account secure, and only share content that you have permission to use.</p></section><section><h3 className="font-semibold text-foreground">Privacy Policy</h3><p className="mt-2">Meetly stores the information needed to provide accounts, rooms, messages, and saved collaboration notes. We do not sell personal information. Avoid sharing passwords, secrets, or sensitive credentials in a room.</p></section><p className="text-xs">These documents are MVP placeholders and should be reviewed before production launch.</p></div>
        <button type="button" onClick={onClose} className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-xl bg-primary font-medium text-primary-foreground transition-opacity hover:opacity-90">Close</button>
      </div>
    </div>
  );
}
