"use client";

import { Show } from "@clerk/nextjs";
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
        <Link
          href="/sign-up"
          className="rounded-xl bg-accent px-8 py-3 text-base font-semibold text-black hover:bg-accent/90 transition-colors"
        >
          Zarejestruj się
        </Link>
        <Link
          href="/sign-in"
          className="rounded-xl border border-card-border px-8 py-3 text-base font-medium hover:bg-white/5 transition-colors"
        >
          Zaloguj się
        </Link>
      </Show>
      <Link
        href="/ranking"
        className="rounded-xl border border-card-border px-8 py-3 text-base font-medium hover:bg-white/5 transition-colors"
      >
        Zobacz ranking
      </Link>
      <Link
        href="/typy"
        className="rounded-xl border border-card-border px-8 py-3 text-base font-medium hover:bg-white/5 transition-colors"
      >
        Typy meczów
      </Link>
    </div>
  );
}
