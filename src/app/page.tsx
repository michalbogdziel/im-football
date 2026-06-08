import Image from "next/image";
import Link from "next/link";
import { HomeAuthButtons } from "@/components/home-auth-buttons";
import { UserPlus, LogIn, Calendar, Trophy, ShieldCheck, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Utwórz konto",
    description: (
      <>
        Zarejestruj się za pomocą firmowego adresu e-mail na stronie —{" "}
        <Link href="/sign-up" className="text-accent hover:text-accent-hover font-semibold transition-colors">
          rejestracja
        </Link>
        .
      </>
    ),
  },
  {
    number: "02",
    icon: LogIn,
    title: "Zaloguj się",
    description: (
      <>
        Po utworzeniu konta{" "}
        <Link href="/sign-in" className="text-accent hover:text-accent-hover font-semibold transition-colors">
          zaloguj się
        </Link>{" "}
        do portalu, aby uzyskać dostęp.
      </>
    ),
  },
  {
    number: "03",
    icon: Calendar,
    title: "Typuj wyniki",
    description: (
      <>
        Przejdź do sekcji <strong>Typowanie</strong> i wprowadź swoje typy przed rozpoczęciem meczów.
      </>
    ),
  },
];

const features = [
  {
    icon: Trophy,
    title: "Tabela Liderów",
    description: "Śledź swoją pozycję w rankingu w czasie rzeczywistym i rywalizuj o miano najlepszego typera firmy.",
  },
  {
    icon: ShieldCheck,
    title: "Przejrzyste Zasady",
    description: "Punkty przyznawane są automatycznie na podstawie oficjalnych wyników: 3 pkt za dokładny wynik, 2 pkt za różnicę bramek, 1 pkt za zwycięzcę.",
  },
  {
    icon: Sparkles,
    title: "Firmowe Emocje",
    description: "Poczuj atmosferę Mistrzostw Świata 2026 i przeżywaj piłkarskie emocje wspólnie z kolegami z pracy.",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-neutral-50/30">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-85px)] bg-white border-b border-neutral-100 flex items-center">
        {/* Glow effect background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-100/45 via-white to-white pointer-events-none" />

        <div className="relative mx-auto grid max-w-[1500px] w-full grid-cols-1 lg:grid-cols-2 px-[5%] py-12 md:py-20 gap-12 items-center">
          <div className="flex flex-col justify-center text-center lg:text-left">
            <div className="inline-flex items-center justify-center lg:justify-start gap-3 mb-6">
              <Image
                src="/images/ball.png"
                alt="Piłka"
                width={80}
                height={80}
                className="h-14 w-auto animate-bounce duration-1000"
              />
              <span className="bg-accent/10 text-accent text-xs uppercase tracking-widest font-extrabold px-3 py-1.5 rounded-full">
                Portal Pracowników Inter-Metal
              </span>
            </div>
            
            <h1 className="im-section-title text-[clamp(2.75rem,8vw,5.5rem)] font-black text-neutral-900 leading-none tracking-tight mb-6">
              MUNDIAL <span className="text-accent bg-clip-text">2026</span>
            </h1>
            
            <p className="text-neutral-600 text-lg md:text-xl font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
              Obstawiaj wyniki meczów, zbieraj punkty za celne typy i walcz o najwyższe miejsce w klasyfikacji generalnej pracowników!
            </p>
            
            <div>
              <HomeAuthButtons />
            </div>
          </div>

          {/* Right Hero Image Column */}
          <div className="relative flex justify-center items-center h-[350px] md:h-[500px] lg:h-full lg:min-h-[500px] w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-neutral-50 to-amber-50/40 border border-neutral-200/50 shadow-inner">
            <div
              className="absolute inset-0 bg-center bg-contain bg-no-repeat transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: "url(/images/hero-player.png)" }}
              aria-hidden
            />
          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section className="bg-white py-20 md:py-28 border-b border-neutral-100">
        <div className="mx-auto max-w-[1500px] px-[5%]">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <span className="text-accent text-sm font-extrabold tracking-wider uppercase mb-2 block">
              Proste kroki
            </span>
            <h2 className="im-section-title text-4xl md:text-5xl font-black text-neutral-900 mb-6">
              Jak zacząć typować?
            </h2>
            <p className="text-neutral-500 text-lg leading-relaxed">
              Zarejestruj się za pomocą firmowego adresu e-mail, zaloguj i podawaj wyniki przed pierwszym gwizdkiem.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.number} 
                  className="group relative flex flex-col p-8 rounded-2xl border border-neutral-200/60 bg-white hover:border-accent/50 hover:shadow-md transition-all duration-300"
                >
                  <div className="absolute top-6 right-8 text-neutral-100 group-hover:text-accent/10 font-black text-7xl select-none transition-colors duration-300">
                    {step.number}
                  </div>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-accent transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed z-10">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-neutral-50/50 py-20 md:py-28">
        <div className="mx-auto max-w-[1500px] px-[5%]">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <span className="text-accent text-sm font-extrabold tracking-wider uppercase mb-2 block">
              Dlaczego warto?
            </span>
            <h2 className="im-section-title text-4xl md:text-5xl font-black text-neutral-900 mb-6">
              Zabawa i Rywalizacja
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={i} 
                  className="flex flex-col p-8 rounded-2xl border border-neutral-200/40 bg-white/60 backdrop-blur-sm shadow-sm"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 text-white">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
