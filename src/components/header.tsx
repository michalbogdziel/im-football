"use client";

import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/dashboard", label: "Panel" },
  { href: "/typy", label: "Typy" },
  { href: "/ranking", label: "Ranking" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  if (isAuthPage) return null;

  return (
    <header className="border-b border-card-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-2xl">⚽</span>
          <span>
            Mundial <span className="text-accent">2026</span>
          </span>
        </Link>

        <Show when="signed-in">
          <nav className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  pathname === link.href
                    ? "bg-accent/20 text-accent"
                    : "text-muted hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </Show>

        <div className="flex items-center gap-3">
          <Show
            when="signed-out"
            fallback={
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                  },
                }}
              />
            }
          >
            <SignInButton mode="modal">
              <button className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent/90 transition-colors">
                Zaloguj się
              </button>
            </SignInButton>
          </Show>
        </div>
      </div>
    </header>
  );
}
