import Image from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200/80 bg-neutral-50/50 mt-auto">
      <div className="mx-auto max-w-[1500px] px-[5%] py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4 border-b border-neutral-200/60 pb-12">
          {/* Column 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block transition-transform duration-200 hover:scale-[1.02]">
              <Image
                src="/images/im-logo.png"
                alt="Inter-Metal"
                width={123}
                height={30}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-neutral-500 max-w-sm leading-relaxed">
              Oficjalny portal pracowniczy do typowania wyników Mistrzostw Świata 2026. Typuj mecze i wygrywaj nagrody firmowe!
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Nawigacja
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/" className="text-neutral-600 hover:text-accent transition-colors">
                  Strona główna
                </Link>
              </li>
              <li>
                <Link href="/ranking" className="text-neutral-600 hover:text-accent transition-colors">
                  Ranking graczy
                </Link>
              </li>
              <li>
                <Link href="/regulamin" className="text-neutral-600 hover:text-accent transition-colors">
                  Regulamin
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Auth & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Uczestnik
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/sign-in" className="text-neutral-600 hover:text-accent transition-colors">
                  Zaloguj się
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="text-neutral-600 hover:text-accent transition-colors">
                  Utwórz konto
                </Link>
              </li>
              <li>
                <a
                  href="https://inter-metal.pl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-accent transition-colors"
                >
                  O firmie Inter-Metal
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-4 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-center md:text-left text-xs text-neutral-500">
            Inter-Metal © {new Date().getFullYear()} All Rights Reserved | Powered by{" "}
            <a
              href="https://reveto.pl/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 hover:text-accent font-semibold transition-colors"
            >
              reveto
            </a>
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://inter-metal.pl/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-neutral-200/60 bg-white text-neutral-500 hover:text-accent hover:border-accent hover:shadow-sm transition-all duration-200"
              aria-label="Strona Inter-Metal"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-neutral-200/60 bg-white text-neutral-500 hover:text-accent hover:border-accent hover:shadow-sm transition-all duration-200 flex items-center justify-center"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.85z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-neutral-200/60 bg-white text-neutral-500 hover:text-accent hover:border-accent hover:shadow-sm transition-all duration-200 flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
