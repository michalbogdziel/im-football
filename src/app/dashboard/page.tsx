import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { getOrCreateUser, isMatchLocked } from "@/lib/auth";
import { getLeaderboard } from "@/lib/actions";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const user = await getOrCreateUser();
  const leaderboard = await getLeaderboard();

  const upcomingMatches = await db.match.findMany({
    where: { kickoffAt: { gte: new Date() } },
    orderBy: { kickoffAt: "asc" },
    take: 5,
  });

  const myPredictions = user
    ? await db.prediction.findMany({
        where: { userId: user.id },
        include: { match: true },
      })
    : [];

  const myPoints = myPredictions.reduce((sum, p) => sum + (p.points ?? 0), 0);
  const myRank =
    leaderboard.findIndex((entry) => entry.id === user?.id) + 1 || null;

  const pendingPredictions = upcomingMatches.filter((match) => {
    if (isMatchLocked(match.kickoffAt)) return false;
    return !myPredictions.some((p) => p.matchId === match.id);
  });

  return (
    <div className="mx-auto max-w-[1500px] px-[5%] py-12 md:py-16">
      <PageHeader
        title={`Witaj, ${user?.name ?? "Graczu"}!`}
        description="Podsumowanie Twoich wyników w typowaniu Mundial 2026."
      />

      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <StatCard label="Twoje punkty" value={String(myPoints)} accent />
        <StatCard label="Twoja pozycja" value={myRank ? `#${myRank}` : "—"} />
        <StatCard
          label="Typy do uzupełnienia"
          value={String(pendingPredictions.length)}
        />
      </div>

      {pendingPredictions.length > 0 && (
        <div className="mb-10 im-card rounded-lg border-accent/40 bg-accent/5 p-6">
          <h2 className="mb-2 text-lg font-semibold text-accent">
            Masz {pendingPredictions.length} mecz(y) bez typu!
          </h2>
          <p className="mb-4 text-sm text-muted">
            Uzupełnij typy zanim rozpoczną się mecze.
          </p>
          <Link href="/typy" className="btn-primary inline-block rounded px-5 py-2 text-sm">
            Przejdź do typowania
          </Link>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="im-section-title text-2xl mb-4">Nadchodzące mecze</h2>
          <div className="space-y-3">
            {upcomingMatches.length === 0 ? (
              <p className="text-muted text-sm">Brak nadchodzących meczów.</p>
            ) : (
              upcomingMatches.map((match) => {
                const prediction = myPredictions.find(
                  (p) => p.matchId === match.id
                );
                return (
                  <div
                    key={match.id}
                    className="im-card rounded-lg px-4 py-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">
                        {match.homeTeam} vs {match.awayTeam}
                      </span>
                      {prediction ? (
                        <span className="text-sm text-accent">
                          Typ: {prediction.homeScore}:{prediction.awayScore}
                        </span>
                      ) : (
                        <span className="text-sm text-red-500">Brak typu</span>
                      )}
                    </div>
                    <p className="text-xs text-muted mt-1">{match.stage}</p>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <section>
          <h2 className="im-section-title text-2xl mb-4">Top 5 rankingu</h2>
          <div className="im-card overflow-hidden rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-card-border bg-[#f9fafd] text-left text-muted">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Gracz</th>
                  <th className="px-4 py-3 text-right">Pkt</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.slice(0, 5).map((entry, i) => (
                  <tr
                    key={entry.id}
                    className={`border-b border-card-border last:border-0 ${
                      entry.id === user?.id ? "bg-accent/10" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{i + 1}</td>
                    <td className="px-4 py-3">{entry.name}</td>
                    <td className="px-4 py-3 text-right font-bold text-accent">
                      {entry.totalPoints}
                    </td>
                  </tr>
                ))}
                {leaderboard.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-6 text-center text-muted">
                      Brak wyników — bądź pierwszy!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Link
            href="/ranking"
            className="mt-3 inline-block text-sm text-accent hover:underline"
          >
            Pełny ranking →
          </Link>
        </section>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="im-card rounded-lg p-6">
      <p className="text-sm text-muted">{label}</p>
      <p className={`mt-1 text-3xl font-bold ${accent ? "text-accent" : ""}`}>
        {value}
      </p>
    </div>
  );
}
