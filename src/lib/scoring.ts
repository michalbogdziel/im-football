export function calculatePoints(
  predictedHome: number,
  predictedAway: number,
  actualHome: number,
  actualAway: number
): number {
  if (predictedHome === actualHome && predictedAway === actualAway) {
    return 3;
  }

  const predictedDiff = predictedHome - predictedAway;
  const actualDiff = actualHome - actualAway;

  if (predictedDiff === 0 && actualDiff === 0) {
    return 2;
  }

  if (predictedDiff === actualDiff) {
    return 2;
  }

  const predictedWinner =
    predictedHome > predictedAway
      ? "home"
      : predictedHome < predictedAway
        ? "away"
        : "draw";
  const actualWinner =
    actualHome > actualAway
      ? "home"
      : actualHome < actualAway
        ? "away"
        : "draw";

  if (predictedWinner === actualWinner) {
    return 1;
  }

  return 0;
}

export const SCORING_RULES = [
  { points: 3, label: "Dokładny wynik" },
  { points: 2, label: "Poprawna różnica bramek lub remis" },
  { points: 1, label: "Poprawny wynik (zwycięzca)" },
  { points: 0, label: "Brak punktów" },
] as const;
