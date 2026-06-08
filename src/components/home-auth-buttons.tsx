"use client";

import { Show } from "@clerk/nextjs";
import Link from "next/link";

export function HomeAuthButtons() {
  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
      <Show
        when="signed-out"
        fallback={
          <Link href="/dashboard" className="btn-primary rounded px-8 py-3 text-base">
            Przejdź do panelu
          </Link>
        }
      >
        <Link href="/sign-up" className="btn-primary rounded px-8 py-3 text-base">
          Zarejestruj się
        </Link>
        <Link href="/sign-in" className="btn-outline rounded px-8 py-3 text-base">
          Zaloguj się
        </Link>
      </Show>
      <Link href="/ranking" className="btn-outline rounded px-8 py-3 text-base">
        Ranking
      </Link>
    </div>
  );
}
