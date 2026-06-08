import { HomeAuthButtons } from "@/components/home-auth-buttons";
import { SCORING_RULES } from "@/lib/scoring";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            Mistrzostwa Świata 2026
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Typy firmowe
            <br />
            <span className="text-accent">Mundial 2026</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted">
            Portal dla pracowników do obstawiania wyników meczów. Typuj przed
            rozpoczęciem meczu, zdobywaj punkty i walcz o pierwsze miejsce w
            rankingu!
          </p>

          <HomeAuthButtons />
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          <FeatureCard
            icon="🎯"
            title="Typuj wyniki"
            description="Podawaj wyniki przed rozpoczęciem każdego meczu. Możesz edytować typ do momentu pierwszego gwizdka."
          />
          <FeatureCard
            icon="🏆"
            title="Zdobywaj punkty"
            description="Dokładny wynik to 3 pkt, poprawna różnica bramek 2 pkt, trafiony zwycięzca 1 pkt."
          />
          <FeatureCard
            icon="📊"
            title="Śledź ranking"
            description="Porównuj wyniki z kolegami i koleżankami z pracy w live rankingu."
          />
        </div>

        <div className="mt-16 rounded-2xl border border-card-border bg-card p-8">
          <h2 className="mb-6 text-xl font-semibold">System punktacji</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {SCORING_RULES.map((rule) => (
              <div
                key={rule.points}
                className="flex items-center gap-4 rounded-xl bg-background/50 px-4 py-3"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-lg font-bold text-accent">
                  {rule.points}
                </span>
                <span className="text-muted">{rule.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-card-border bg-card p-6">
      <div className="mb-4 text-3xl">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{description}</p>
    </div>
  );
}
