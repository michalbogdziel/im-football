import { getOrCreateUser, isMatchLocked } from "@/lib/auth";
import { db } from "@/lib/db";
import { MatchCard } from "@/components/match-card";

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
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Typy meczów</h1>
        <p className="mt-2 text-muted">
          Podawaj wyniki przed rozpoczęciem meczu. Edycja możliwa do pierwszego
          gwizdka.
        </p>
      </div>

      {openMatches.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-accent">
            Otwarte typowanie ({openMatches.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {openMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {closedMatches.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-muted">
            Zakończone / zamknięte ({closedMatches.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {closedMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {matches.length === 0 && (
        <div className="rounded-2xl border border-card-border bg-card p-10 text-center">
          <p className="text-muted">
            Brak meczów w bazie. Uruchom seed:{" "}
            <code className="text-accent">npm run db:seed</code>
          </p>
        </div>
      )}
    </div>
  );
}
