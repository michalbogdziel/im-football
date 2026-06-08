"use client";

import { Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const publicLinks = [{ href: "/ranking", label: "Ranking" }];

const authLinks = [
  { href: "/dashboard", label: "Panel" },
  { href: "/typy", label: "Typy" },
  { href: "/admin", label: "Admin" },
];

function NavLink({
  href,
  label,
  pathname,
  onClick,
}: {
  href: string;
  label: string;
  pathname: string;
  onClick?: () => void;
}) {
  const active = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-lg px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-accent/20 text-accent"
          : "text-muted hover:text-white hover:bg-white/5"
      }`}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  if (isAuthPage) return null;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="border-b border-card-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg shrink-0"
          onClick={closeMenu}
        >
          <span className="text-2xl">⚽</span>
          <span>
            Mundial <span className="text-accent">2026</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {publicLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              pathname={pathname}
            />
          ))}
          <Show when="signed-in">
            {authLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                pathname={pathname}
              />
            ))}
          </Show>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Show
            when="signed-out"
            fallback={
              <UserButton
                appearance={{
                  elements: { avatarBox: "w-9 h-9" },
                }}
              />
            }
          >
            <Link
              href="/sign-in"
              className="hidden sm:inline-block rounded-lg border border-card-border px-4 py-2 text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Logowanie
            </Link>
            <Link
              href="/sign-up"
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent/90 transition-colors"
            >
              Rejestracja
            </Link>
          </Show>

          <button
            type="button"
            aria-label="Menu"
            className="md:hidden rounded-lg border border-card-border p-2 text-muted hover:text-white"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-card-border bg-card px-4 py-3 flex flex-col gap-1">
          <NavLink href="/" label="Strona główna" pathname={pathname} onClick={closeMenu} />
          {publicLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              pathname={pathname}
              onClick={closeMenu}
            />
          ))}
          <Show when="signed-in">
            {authLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                pathname={pathname}
                onClick={closeMenu}
              />
            ))}
          </Show>
          <Show when="signed-out">
            <NavLink
              href="/sign-in"
              label="Logowanie"
              pathname={pathname}
              onClick={closeMenu}
            />
          </Show>
        </nav>
      )}
    </header>
  );
}
