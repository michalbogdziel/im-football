"use client";

import { Show, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const publicLinks = [
  { href: "/", label: "Strona główna" },
  { href: "/ranking", label: "Ranking" },
  { href: "/regulamin", label: "Regulamin" },
];

const authLinks = [
  { href: "/dashboard", label: "Podsumowanie" },
  { href: "/typy", label: "Typowanie" },
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
      className={`nav-link px-2 py-2 text-base ${active ? "nav-link-active" : ""}`}
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
    <header className="sticky top-0 z-50 border-t-2 border-accent bg-white/99 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-[5%] py-3 min-h-[85px]">
        <Link href="/" className="shrink-0" onClick={closeMenu}>
          <Image
            src="/images/im-logo.png"
            alt="Inter-Metal"
            width={180}
            height={45}
            className="h-10 w-auto md:h-11"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {publicLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              pathname={pathname}
            />
          ))}
          <Show when="signed-in">
            <span className="h-8 w-px bg-card-border" />
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

        <div className="flex items-center gap-3">
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
            <div className="hidden sm:flex items-center gap-5">
              <Link href="/sign-in" className="nav-link text-base">
                Logowanie
              </Link>
              <Link href="/sign-up" className="nav-link text-base">
                Rejestracja
              </Link>
            </div>
          </Show>

          <button
            type="button"
            aria-label="Menu"
            className="lg:hidden p-2 text-foreground hover:text-accent"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden border-t border-card-border bg-white px-[5%] py-4 flex flex-col gap-1">
          {[...publicLinks, ...authLinks].map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              pathname={pathname}
              onClick={closeMenu}
            />
          ))}
          <Show when="signed-out">
            <NavLink
              href="/sign-in"
              label="Logowanie"
              pathname={pathname}
              onClick={closeMenu}
            />
            <NavLink
              href="/sign-up"
              label="Rejestracja"
              pathname={pathname}
              onClick={closeMenu}
            />
          </Show>
        </nav>
      )}
    </header>
  );
}
