import { PageHeader } from "@/components/page-header";
import { getLeaderboard } from "@/lib/actions";
import { getOrCreateUser } from "@/lib/auth";

export default async function RankingPage() {
  const user = await getOrCreateUser();
  const leaderboard = await getLeaderboard();

  return (
    <div className="mx-auto max-w-[1500px] px-[5%] py-12 md:py-16">
      <PageHeader
        title="Ranking"
        description="Klasyfikacja generalna wszystkich graczy"
      />

      <div className="im-card overflow-hidden rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-card-border bg-[#f9fafd] text-left text-sm text-muted">
              <th className="px-6 py-4 w-16">#</th>
              <th className="px-6 py-4">Gracz</th>
              <th className="px-6 py-4 text-center hidden sm:table-cell">
                Typy
              </th>
              <th className="px-6 py-4 text-right">Punkty</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => {
              const isMe = entry.id === user?.id;
              const medal =
                index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : null;

              return (
                <tr
                  key={entry.id}
                  className={`border-b border-card-border last:border-0 transition-colors ${
                    isMe ? "bg-accent/10" : "hover:bg-[#f9fafd]"
                  }`}
                >
                  <td className="px-6 py-4 font-medium">{medal ?? index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium">
                      {entry.name}
                      {isMe && (
                        <span className="ml-2 text-xs text-accent">(Ty)</span>
                      )}
                    </div>
                    <div className="text-xs text-muted sm:hidden">
                      {entry.predictionsCount} typów
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center hidden sm:table-cell text-muted">
                    {entry.predictionsCount}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-xl font-bold text-accent">
                      {entry.totalPoints}
                    </span>
                  </td>
                </tr>
              );
            })}
            {leaderboard.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-muted">
                  Brak graczy w rankingu. Zaloguj się i zacznij typować!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
