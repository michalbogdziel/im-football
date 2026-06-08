import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminMatchRow } from "@/components/admin-match-row";

export default async function AdminPage() {
  if (!(await isAdmin())) {
    redirect("/dashboard");
  }

  const matches = await db.match.findMany({
    orderBy: [{ kickoffAt: "asc" }, { matchOrder: "asc" }],
    include: {
      _count: { select: { predictions: true } },
    },
  });

  const adminMatches = matches.map((match) => ({
    id: match.id,
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    kickoffAt: match.kickoffAt,
    stage: match.stage,
    homeScore: match.homeScore,
    awayScore: match.awayScore,
    predictionsCount: match._count.predictions,
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Panel administratora</h1>
        <p className="mt-2 text-muted">
          Wprowadzaj wyniki meczów — punkty graczy przeliczają się automatycznie.
        </p>
      </div>

      <div className="rounded-2xl border border-card-border bg-card overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-card-border text-left text-sm text-muted">
              <th className="px-4 py-3">Data</th>
              <th className="px-4 py-3">Mecz</th>
              <th className="px-4 py-3">Typy</th>
              <th className="px-4 py-3">Wynik</th>
            </tr>
          </thead>
          <tbody>
            {adminMatches.map((match) => (
              <AdminMatchRow key={match.id} match={match} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
