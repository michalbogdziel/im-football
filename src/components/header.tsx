"use client";

import { Show, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  Trophy,
  FileText,
  LayoutDashboard,
  Calendar,
  Menu,
  X,
  LogIn,
  UserPlus
} from "lucide-react";

const publicLinks = [
  { href: "/", label: "Strona główna", icon: Home },
  { href: "/ranking", label: "Ranking", icon: Trophy },
  { href: "/regulamin", label: "Regulamin", icon: FileText },
];

const authLinks = [
  { href: "/dashboard", label: "Podsumowanie", icon: LayoutDashboard },
  { href: "/typy", label: "Typowanie", icon: Calendar },
];

function NavLink({
  href,
  label,
  icon: Icon,
  pathname,
  onClick,
}: {
  href: string;
  label: string;
  icon: any;
  pathname: string;
  onClick?: () => void;
}) {
  const active = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
        active
          ? "text-accent bg-accent/5 font-semibold"
          : "text-foreground/75 hover:text-accent hover:bg-neutral-50"
      }`}
    >
      <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${active ? "text-accent" : "text-foreground/50 group-hover:text-accent"}`} />
      <span>{label}</span>
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  icon: Icon,
  pathname,
  onClick,
}: {
  href: string;
  label: string;
  icon: any;
  pathname: string;
  onClick?: () => void;
}) {
  const active = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-all ${
        active
          ? "text-accent bg-accent/5 font-bold"
          : "text-foreground/85 hover:text-accent hover:bg-neutral-50"
      }`}
    >
      <Icon className={`w-5 h-5 ${active ? "text-accent" : "text-foreground/50"}`} />
      <span>{label}</span>
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
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-neutral-200/60">
      {/* Top accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500" />
      
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-[5%] py-4 min-h-[80px]">
        {/* Logo */}
        <Link href="/" className="shrink-0 transition-transform duration-200 hover:scale-[1.02]" onClick={closeMenu}>
          <Image
            src="/images/im-logo.png"
            alt="Inter-Metal"
            width={180}
            height={45}
            className="h-9 w-auto md:h-10"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {publicLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              pathname={pathname}
            />
          ))}
          <Show when="signed-in">
            <span className="mx-2 h-5 w-px bg-neutral-200" />
            {authLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                icon={link.icon}
                pathname={pathname}
              />
            ))}
          </Show>
        </nav>

        {/* User Auth Buttons / User Profile */}
        <div className="flex items-center gap-4">
          <Show
            when="signed-out"
            fallback={
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 border border-neutral-200 hover:scale-105 transition-transform duration-200",
                  },
                }}
              />
            }
          >
            <div className="hidden sm:flex items-center gap-4">
              <Link
                href="/sign-in"
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground/75 hover:text-accent transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Logowanie</span>
              </Link>
              <Link
                href="/sign-up"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-md bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow transition-all duration-200"
              >
                <UserPlus className="w-4 h-4" />
                <span>Rejestracja</span>
              </Link>
            </div>
          </Show>

          {/* Hamburger Menu Icon */}
          <button
            type="button"
            aria-label="Menu"
            className="lg:hidden p-2 text-foreground/80 hover:text-accent hover:bg-neutral-100 rounded-md transition-colors"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-neutral-100 bg-white/95 backdrop-blur-md px-[5%] py-4 shadow-lg flex flex-col gap-1 animate-in slide-in-from-top-4 duration-200">
          {publicLinks.map((link) => (
            <MobileNavLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              pathname={pathname}
              onClick={closeMenu}
            />
          ))}
          <Show when="signed-in">
            <div className="my-2 border-t border-neutral-100" />
            {authLinks.map((link) => (
              <MobileNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                icon={link.icon}
                pathname={pathname}
                onClick={closeMenu}
              />
            ))}
          </Show>
          <Show when="signed-out">
            <div className="my-2 border-t border-neutral-100" />
            <MobileNavLink
              href="/sign-in"
              label="Logowanie"
              icon={LogIn}
              pathname={pathname}
              onClick={closeMenu}
            />
            <MobileNavLink
              href="/sign-up"
              label="Rejestracja"
              icon={UserPlus}
              pathname={pathname}
              onClick={closeMenu}
            />
          </Show>
        </div>
      )}
    </header>
  );
}
