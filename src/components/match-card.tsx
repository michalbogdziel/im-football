"use client";

import { useState, useTransition } from "react";
import { savePrediction } from "@/lib/actions";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

type Match = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  kickoffAt: Date;
  stage: string;
  groupName: string | null;
  homeScore: number | null;
  awayScore: number | null;
  prediction: { homeScore: number; awayScore: number; points: number | null } | null;
  locked: boolean;
};

export function MatchCard({ match }: { match: Match }) {
  const [home, setHome] = useState(String(match.prediction?.homeScore ?? ""));
  const [away, setAway] = useState(String(match.prediction?.awayScore ?? ""));
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const hasResult = match.homeScore !== null && match.awayScore !== null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const result = await savePrediction(match.id, Number(home), Number(away));
      if (result.error) {
        setMessage(result.error);
      } else {
        setMessage("Typ zapisany!");
      }
    });
  }

  return (
    <article className="im-card rounded-lg p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
        <span>
          {match.stage}
          {match.groupName ? ` · ${match.groupName}` : ""}
        </span>
        <span>
          {format(new Date(match.kickoffAt), "d MMM yyyy, HH:mm", { locale: pl })}
        </span>
      </div>

      <div className="mb-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
        <div>
          <p className="text-lg font-semibold">{match.homeTeam}</p>
        </div>
        <div className="text-muted text-sm font-medium">vs</div>
        <div>
          <p className="text-lg font-semibold">{match.awayTeam}</p>
        </div>
      </div>

      {hasResult && (
        <div className="mb-4 rounded-lg bg-accent/10 px-4 py-2 text-center text-sm">
          Wynik meczu:{" "}
          <strong>
            {match.homeScore}:{match.awayScore}
          </strong>
          {match.prediction?.points != null && (
            <span className="ml-2 text-accent">
              · Twoje punkty: {match.prediction.points}
            </span>
          )}
        </div>
      )}

      {match.locked ? (
        <div className="rounded-lg bg-[#f9fafd] px-4 py-3 text-center text-sm text-muted">
          {match.prediction ? (
            <>
              Twój typ:{" "}
              <strong>
                {match.prediction.homeScore}:{match.prediction.awayScore}
              </strong>
            </>
          ) : (
            "Typowanie zamknięte — brak typu"
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center justify-center gap-3">
            <input
              type="number"
              min={0}
              max={20}
              required
              value={home}
              onChange={(e) => setHome(e.target.value)}
              className="w-16 rounded-lg border border-card-border bg-background px-3 py-2 text-center text-lg font-bold focus:border-accent focus:outline-none"
              placeholder="0"
            />
            <span className="text-muted">:</span>
            <input
              type="number"
              min={0}
              max={20}
              required
              value={away}
              onChange={(e) => setAway(e.target.value)}
              className="w-16 rounded-lg border border-card-border bg-background px-3 py-2 text-center text-lg font-bold focus:border-accent focus:outline-none"
              placeholder="0"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="btn-primary w-full rounded py-2.5 text-sm disabled:opacity-50"
          >
            {isPending ? "Zapisywanie..." : match.prediction ? "Zaktualizuj typ" : "Zapisz typ"}
          </button>
          {message && (
            <p
              className={`text-center text-sm ${
                message.includes("!") ? "text-accent" : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      )}
    </article>
  );
}
