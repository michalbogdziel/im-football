import { PageHeader } from "@/components/page-header";
import { SCORING_RULES } from "@/lib/scoring";

export default function RegulaminPage() {
  return (
    <div className="mx-auto max-w-[1500px] px-[5%] py-12 md:py-16">
      <PageHeader
        title="Regulamin"
        description="Zasady punktacji i uczestnictwa w firmowym typowaniu Mundial 2026."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="im-card rounded-lg p-8">
          <h2 className="im-section-title text-2xl mb-6">System punktacji</h2>
          <div className="space-y-4">
            {SCORING_RULES.map((rule) => (
              <div
                key={rule.points}
                className="flex items-center gap-4 border-b border-card-border pb-4 last:border-0"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xl font-bold text-accent">
                  {rule.points}
                </span>
                <span className="text-foreground">{rule.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="im-card rounded-lg p-8">
          <h2 className="im-section-title text-2xl mb-6">Zasady gry</h2>
          <ul className="space-y-4 text-foreground leading-relaxed">
            <li>
              Typy można składać i edytować do momentu rozpoczęcia meczu
              (pierwszego gwizdka).
            </li>
            <li>
              Po zakończeniu meczu administrator wprowadza oficjalny wynik —
              punkty przeliczają się automatycznie.
            </li>
            <li>
              Ranking jest publiczny i aktualizuje się po każdym rozstrzygniętym
              meczu.
            </li>
            <li>
              Udział w zabawie jest dobrowolny i przeznaczony wyłącznie dla
              pracowników Inter-Metal.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
