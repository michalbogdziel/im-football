"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getOrCreateUser, isAdmin, isMatchLocked } from "@/lib/auth";
import { calculatePoints } from "@/lib/scoring";

export async function savePrediction(matchId: string, homeScore: number, awayScore: number) {
  const user = await getOrCreateUser();
  if (!user) {
    return { error: "Musisz być zalogowany." };
  }

  if (
    !Number.isInteger(homeScore) ||
    !Number.isInteger(awayScore) ||
    homeScore < 0 ||
    awayScore < 0 ||
    homeScore > 20 ||
    awayScore > 20
  ) {
    return { error: "Podaj poprawny wynik (0–20)." };
  }

  const match = await db.match.findUnique({ where: { id: matchId } });
  if (!match) {
    return { error: "Mecz nie istnieje." };
  }

  if (isMatchLocked(match.kickoffAt)) {
    return { error: "Typowanie zamknięte — mecz już się rozpoczął." };
  }

  await db.prediction.upsert({
    where: { userId_matchId: { userId: user.id, matchId } },
    update: { homeScore, awayScore },
    create: { userId: user.id, matchId, homeScore, awayScore },
  });

  revalidatePath("/typy");
  revalidatePath("/ranking");
  revalidatePath("/dashboard");

  return { success: true };
}

export async function setMatchResult(
  matchId: string,
  homeScore: number,
  awayScore: number
) {
  if (!(await isAdmin())) {
    return { error: "Brak uprawnień administratora." };
  }

  if (
    !Number.isInteger(homeScore) ||
    !Number.isInteger(awayScore) ||
    homeScore < 0 ||
    awayScore < 0
  ) {
    return { error: "Podaj poprawny wynik." };
  }

  await db.match.update({
    where: { id: matchId },
    data: { homeScore, awayScore },
  });

  const predictions = await db.prediction.findMany({ where: { matchId } });

  await Promise.all(
    predictions.map((p) =>
      db.prediction.update({
        where: { id: p.id },
        data: {
          points: calculatePoints(p.homeScore, p.awayScore, homeScore, awayScore),
        },
      })
    )
  );

  revalidatePath("/typy");
  revalidatePath("/ranking");
  revalidatePath("/dashboard");
  revalidatePath("/admin");

  return { success: true };
}

export async function getLeaderboard() {
  const users = await db.user.findMany({
    include: {
      predictions: {
        where: { points: { not: null } },
        select: { points: true },
      },
    },
    orderBy: { name: "asc" },
  });

  return users
    .map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      totalPoints: user.predictions.reduce((sum, p) => sum + (p.points ?? 0), 0),
      predictionsCount: user.predictions.length,
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints || a.name.localeCompare(b.name, "pl"));
}
