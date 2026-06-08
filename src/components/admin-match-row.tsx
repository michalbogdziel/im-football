"use client";

import { useState, useTransition } from "react";
import { setMatchResult } from "@/lib/actions";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

type AdminMatch = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  kickoffAt: Date;
  stage: string;
  homeScore: number | null;
  awayScore: number | null;
  predictionsCount: number;
};

export function AdminMatchRow({ match }: { match: AdminMatch }) {
  const [home, setHome] = useState(String(match.homeScore ?? ""));
  const [away, setAway] = useState(String(match.awayScore ?? ""));
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const hasResult = match.homeScore !== null && match.awayScore !== null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const result = await setMatchResult(match.id, Number(home), Number(away));
      setMessage(result.error ?? "Wynik zapisany i punkty przeliczone!");
    });
  }

  return (
    <tr className="border-b border-card-border">
      <td className="px-4 py-3 text-sm text-muted">
        {format(new Date(match.kickoffAt), "d MMM HH:mm", { locale: pl })}
      </td>
      <td className="px-4 py-3">
        <div className="font-medium">
          {match.homeTeam} vs {match.awayTeam}
        </div>
        <div className="text-xs text-muted">{match.stage}</div>
      </td>
      <td className="px-4 py-3 text-sm text-muted">{match.predictionsCount}</td>
      <td className="px-4 py-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            max={20}
            required
            value={home}
            onChange={(e) => setHome(e.target.value)}
            className="w-14 rounded border border-card-border bg-background px-2 py-1 text-center text-sm focus:border-accent focus:outline-none"
          />
          <span>:</span>
          <input
            type="number"
            min={0}
            max={20}
            required
            value={away}
            onChange={(e) => setAway(e.target.value)}
            className="w-14 rounded border border-card-border bg-background px-2 py-1 text-center text-sm focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            disabled={isPending}
            className="rounded bg-accent px-3 py-1 text-xs font-semibold text-black hover:bg-accent/90 disabled:opacity-50"
          >
            {hasResult ? "Aktualizuj" : "Zapisz"}
          </button>
        </form>
        {message && (
          <p className="mt-1 text-xs text-accent">{message}</p>
        )}
      </td>
    </tr>
  );
}
