import { PageHeader } from "@/components/page-header";
import { MatchCard } from "@/components/match-card";
import { getOrCreateUser, isMatchLocked } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function TypyPage() {
  const user = await getOrCreateUser();

  const matches = await db.match.findMany({
    orderBy: [{ kickoffAt: "asc" }, { matchOrder: "asc" }],
  });

  const predictions = user
    ? await db.prediction.findMany({ where: { userId: user.id } })
    : [];

  const matchCards = matches.map((match) => {
    const prediction = predictions.find((p) => p.matchId === match.id);
    return {
      id: match.id,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      kickoffAt: match.kickoffAt,
      stage: match.stage,
      groupName: match.groupName,
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      prediction: prediction
        ? {
            homeScore: prediction.homeScore,
            awayScore: prediction.awayScore,
            points: prediction.points,
          }
        : null,
      locked: isMatchLocked(match.kickoffAt),
    };
  });

  const openMatches = matchCards.filter((m) => !m.locked);
  const closedMatches = matchCards.filter((m) => m.locked);

  return (
    <div className="mx-auto max-w-[1500px] px-[5%] py-12 md:py-16">
      <PageHeader
        title="Typowanie"
        description="Podawaj wyniki przed rozpoczęciem meczu. Edycja możliwa do pierwszego gwizdka."
      />

      {openMatches.length > 0 && (
        <section className="mb-12">
          <h2 className="im-section-title text-2xl mb-4 text-accent">
            Otwarte typowanie ({openMatches.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {openMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {closedMatches.length > 0 && (
        <section>
          <h2 className="im-section-title text-2xl mb-4 text-muted">
            Zakończone / zamknięte ({closedMatches.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {closedMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {matches.length === 0 && (
        <div className="im-card rounded-lg p-10 text-center">
          <p className="text-muted">
            Brak meczów w bazie. Uruchom seed:{" "}
            <code className="text-accent">npm run db:seed</code>
          </p>
        </div>
      )}
    </div>
  );
}
