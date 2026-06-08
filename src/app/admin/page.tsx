import { redirect } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { AdminMatchRow } from "@/components/admin-match-row";
import { isAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

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
    <div className="mx-auto max-w-[1500px] px-[5%] py-12 md:py-16">
      <PageHeader
        title="Panel administratora"
        description="Wprowadzaj wyniki meczów — punkty graczy przeliczają się automatycznie."
      />

      <div className="im-card overflow-x-auto rounded-lg">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-card-border bg-[#f9fafd] text-left text-sm text-muted">
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
