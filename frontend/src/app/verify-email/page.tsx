"use client";

import Link from "next/link";
import { ArrowRight, MailCheck } from "lucide-react";
import { useState } from "react";

export default function VerifyEmailPage() {
  const [code, setCode] = useState("");

  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-background px-6 py-16 text-foreground">
      <section className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><MailCheck className="h-6 w-6" /></div>
        <div className="mt-6 text-center"><h1 className="text-2xl font-semibold tracking-tight">Verify your email</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">Enter the six-digit code we sent to your email address.</p></div>
        <form className="mt-8 grid gap-4" onSubmit={(event) => event.preventDefault()}><label className="grid gap-2 text-sm font-medium">Verification code<input value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" placeholder="Enter 6-digit code" className="h-12 rounded-xl border border-input bg-background px-4 text-center text-lg tracking-[0.35em] outline-none transition-colors placeholder:text-sm placeholder:tracking-normal focus:border-ring focus:ring-2 focus:ring-ring/20" /></label><button type="submit" disabled={code.length !== 6} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">Verify email <ArrowRight className="h-4 w-4" /></button></form>
        <p className="mt-6 text-center text-sm text-muted-foreground">Didn’t receive a code? <button type="button" className="font-medium text-primary hover:underline">Resend code</button></p>
        <p className="mt-4 text-center text-sm"><Link href="/sign-up" className="text-primary hover:underline">Back to sign up</Link></p>
      </section>
    </main>
  );
}
