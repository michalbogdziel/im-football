"use client";

import { Show, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export function HomeAuthButtons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Show
        when="signed-out"
        fallback={
          <Link
            href="/dashboard"
            className="rounded-xl bg-accent px-8 py-3 text-base font-semibold text-black hover:bg-accent/90 transition-colors"
          >
            Przejdź do panelu
          </Link>
        }
      >
        <SignInButton mode="modal">
          <button className="rounded-xl bg-accent px-8 py-3 text-base font-semibold text-black hover:bg-accent/90 transition-colors">
            Zaloguj się / Zarejestruj
          </button>
        </SignInButton>
      </Show>
      <Link
        href="/ranking"
        className="rounded-xl border border-card-border px-8 py-3 text-base font-medium hover:bg-white/5 transition-colors"
      >
        Zobacz ranking
      </Link>
    </div>
  );
}
