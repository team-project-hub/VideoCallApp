"use client";

import Link from "next/link";
import { ArrowUpRight, Video } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Meetly home">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"><Video className="h-5 w-5" /></span>
          <span className="text-xl font-semibold tracking-tight">Meetly</span>
        </Link>
        {isLandingPage && <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">Features</a>
          <a href="#workflow" className="transition-colors hover:text-foreground">How it works</a>
          <a href="#developers" className="transition-colors hover:text-foreground">For developers</a>
        </div>}
        <div className="flex items-center gap-2 sm:gap-3">
          <ModeToggle />
          <Link href="/sign-in" className="hidden rounded-full px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent sm:block">Sign in</Link>
          <Link href="/sign-up" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20">Get started <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </nav>
    </header>
  );
}
