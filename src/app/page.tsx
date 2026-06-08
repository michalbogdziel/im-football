import Image from "next/image";
import Link from "next/link";
import { HomeAuthButtons } from "@/components/home-auth-buttons";

const steps = [
  {
    number: "01",
    title: "Zarejestruj się",
    description: (
      <>
        Zarejestruj się na stronie używając linku —{" "}
        <Link href="/sign-up" className="text-accent hover:underline">
          rejestracja
        </Link>
        .
      </>
    ),
  },
  {
    number: "02",
    title: "Zaloguj się",
    description: (
      <>
        Po poprawnej rejestracji możesz{" "}
        <Link href="/sign-in" className="text-accent hover:underline">
          zalogować się
        </Link>{" "}
        na swoje konto.
      </>
    ),
  },
  {
    number: "03",
    title: "Typuj mecze",
    description: (
      <>
        Po zalogowaniu w menu pojawi się pozycja{" "}
        <strong>Typowanie</strong> — tam podajesz wyniki przed meczami.
      </>
    ),
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative min-h-[calc(100vh-85px)] bg-white">
        <div className="mx-auto grid max-w-[1500px] lg:grid-cols-2 lg:min-h-[calc(100vh-85px)]">
          <div className="flex flex-col justify-center px-[5%] py-16 lg:py-24">
            <Image
              src="/images/ball.png"
              alt="Piłka"
              width={200}
              height={200}
              className="mx-auto lg:mx-0 mb-6 h-[120px] w-auto md:h-[160px] lg:h-[200px]"
            />
            <h1 className="text-center lg:text-left im-section-title text-[clamp(3.5rem,12vw,8.75rem)] mb-6">
              MUNDIAL 2026
            </h1>
            <p className="text-center lg:text-left text-[clamp(1.1rem,2.5vw,1.75rem)] font-medium text-[#1b1b1b] leading-tight px-[8%] lg:px-0">
              Witamy na stronie do typowania wyników meczów turnieju Mundial
              2026 pracowników Inter-Metal.
            </p>
            <div className="mt-10 flex justify-center lg:justify-start">
              <HomeAuthButtons />
            </div>
          </div>

          <div
            className="relative min-h-[320px] lg:min-h-full bg-center bg-contain bg-no-repeat"
            style={{ backgroundImage: "url(/images/hero-player.png)" }}
            aria-hidden
          />
        </div>
      </section>

      <section className="bg-white px-[5%] py-16 md:py-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-16 max-w-xl">
            <h2 className="im-section-title text-[clamp(2.5rem,6vw,5rem)] mb-6">
              Jak zacząć typować?
            </h2>
            <p className="text-muted text-lg leading-relaxed tracking-wide">
              Kieruj się krokami opisanymi obok w celu poprawnego utworzenia
              konta oraz zamieszczenia swoich wyników w tabelkach typowania
              Mundial 2026.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col">
                <div className="mb-4 h-0.5 w-3/4 bg-foreground" />
                <span className="im-step-number mb-4">{step.number}</span>
                <h3 className="text-[clamp(1.25rem,2vw,2rem)] font-bold text-foreground mb-6">
                  {step.title}
                </h3>
                <p className="text-[17px] text-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
