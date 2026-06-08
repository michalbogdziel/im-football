import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-2 border-accent bg-white mt-auto">
      <div className="mx-auto max-w-[1500px] px-[5%]">
        <div className="grid gap-6 border-b border-card-border py-8 md:grid-cols-2 md:items-center">
          <div className="flex justify-center md:justify-start">
            <Image
              src="/images/im-logo.png"
              alt="Inter-Metal"
              width={123}
              height={30}
              className="h-8 w-auto"
            />
          </div>
          <div className="flex justify-center md:justify-end gap-6 text-base">
            <Link href="/sign-in" className="nav-link">
              Logowanie
            </Link>
            <Link href="/sign-up" className="nav-link">
              Rejestracja
            </Link>
          </div>
        </div>

        <div className="grid gap-4 py-10 md:grid-cols-2 md:items-center">
          <p className="text-center md:text-left text-[13px] text-muted">
            Inter-Metal © {new Date().getFullYear()} All Rights Reserved |{" "}
            Powered by{" "}
            <a
              href="https://reveto.pl/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              reveto
            </a>
          </p>
          <div className="flex justify-center md:justify-end gap-5 text-muted">
            <a
              href="https://inter-metal.pl/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors text-sm"
              aria-label="Strona Inter-Metal"
            >
              🌐
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors text-sm"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors text-sm"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
