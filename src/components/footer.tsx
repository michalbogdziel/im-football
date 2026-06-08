import Link from "next/link";

const links = [
  { href: "/", label: "Strona główna" },
  { href: "/ranking", label: "Ranking" },
  { href: "/typy", label: "Typy" },
  { href: "/dashboard", label: "Panel" },
  { href: "/sign-in", label: "Logowanie" },
  { href: "/sign-up", label: "Rejestracja" },
];

export function Footer() {
  return (
    <footer className="border-t border-card-border bg-card/50 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-accent transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
