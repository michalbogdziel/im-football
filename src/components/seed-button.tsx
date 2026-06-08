"use client";

import { useState } from "react";
import { runSeedDatabase } from "@/lib/seed-action";

export function SeedButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSeed = async () => {
    if (!confirm("Czy na pewno chcesz zainicjalizować bazę danych meczami Mundialu?")) {
      return;
    }

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await runSeedDatabase();
      if (res.error) {
        setError(res.error);
      } else if (res.success) {
        setMessage(`Sukces! Dodano ${res.count} meczów do bazy.`);
        window.location.reload();
      }
    } catch (err: any) {
      setError(err.message || "Wystąpił nieoczekiwany błąd.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 flex flex-col items-start gap-2">
      <button
        onClick={handleSeed}
        disabled={loading}
        className="btn-primary rounded px-5 py-2 text-sm disabled:opacity-50"
      >
        {loading ? "Inicjalizowanie..." : "Załaduj mecze (Seed)"}
      </button>
      {message && <p className="text-sm text-green-600 font-medium">{message}</p>}
      {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
    </div>
  );
}
