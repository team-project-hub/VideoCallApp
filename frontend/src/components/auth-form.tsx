"use client";

import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { LegalModal } from "@/components/legal-modal";
import { SiteFooter } from "@/components/site-footer";

type AuthFormProps = { mode: "signin" | "signup" };

export function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === "signup";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">

      <section className="mx-auto grid w-full max-w-5xl items-center gap-12 px-6 pb-16 pt-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pt-16">
        <div className="hidden lg:block">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">Welcome to Meetly</p>
          <h1 className="max-w-md text-5xl font-semibold leading-tight tracking-tight">Your next great conversation starts here.</h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">Join a calmer way to meet, collaborate, and stay close to your team.</p>
        </div>

        <div className="mx-auto w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight">{isSignUp ? "Create your account" : "Welcome back"}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{isSignUp ? "Start making better connections today." : "Sign in to continue to your meetings."}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background text-sm font-medium transition-colors hover:bg-accent"><FcGoogle className="h-4 w-4" /> Google</button>
            <button type="button" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background text-sm font-medium transition-colors hover:bg-accent"><SiGithub className="h-4 w-4" /> GitHub</button>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" /><span>or continue with email</span><span className="h-px flex-1 bg-border" /></div>

          <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
            {isSignUp && <label className="grid gap-2 text-sm font-medium">Name<input className="h-11 rounded-xl border border-input bg-background px-3 font-normal outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20" placeholder="Enter your name" /></label>}
            <label className="grid gap-2 text-sm font-medium">Email<input type="email" className="h-11 rounded-xl border border-input bg-background px-3 font-normal outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20" placeholder="Enter your email" /></label>
            <label className="grid gap-2 text-sm font-medium">Password<div className="relative"><LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><input type={showPassword ? "text" : "password"} className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-11 font-normal outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20" placeholder="Enter your password" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-2.5 text-muted-foreground transition-colors hover:text-foreground" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div></label>
            {isSignUp && <label className="grid gap-2 text-sm font-medium">Confirm password<div className="relative"><LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><input type={showConfirmPassword ? "text" : "password"} className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-11 font-normal outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20" placeholder="Confirm your password" /><button type="button" onClick={() => setShowConfirmPassword((visible) => !visible)} className="absolute right-3 top-2.5 text-muted-foreground transition-colors hover:text-foreground" aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}>{showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div></label>}
            {isSignUp && <label className="flex items-start gap-3 text-xs leading-5 text-muted-foreground"><input type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-primary" /><span>By creating an account, you agree to our <button type="button" onClick={() => setLegalOpen(true)} className="font-medium text-primary hover:underline">Terms and Conditions</button> and <button type="button" onClick={() => setLegalOpen(true)} className="font-medium text-primary hover:underline">Privacy Policy</button>.</span></label>}
            <button type="submit" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary font-medium text-primary-foreground transition-opacity hover:opacity-90"><Mail className="h-4 w-4" />{isSignUp ? "Create account" : "Sign in"}</button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">{isSignUp ? "Already have an account? " : "New to Meetly? "}<Link href={isSignUp ? "/sign-in" : "/sign-up"} className="font-medium text-primary hover:underline">{isSignUp ? "Sign in" : "Create an account"}</Link></p>
        </div>
      </section>
      <LegalModal open={legalOpen} onClose={() => setLegalOpen(false)} />
      <SiteFooter />
    </main>
  );
}
