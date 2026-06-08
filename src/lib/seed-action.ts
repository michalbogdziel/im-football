"use server";

import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";

const matches = [
  {
    homeTeam: "Meksyk",
    awayTeam: "RPA",
    kickoffAt: new Date("2026-06-11T19:00:00Z"),
    stage: "Faza grupowa",
    groupName: "Grupa A",
    matchOrder: 1,
  },
  {
    homeTeam: "Kanada",
    awayTeam: "Chorwacja",
    kickoffAt: new Date("2026-06-12T01:00:00Z"),
    stage: "Faza grupowa",
    groupName: "Grupa B",
    matchOrder: 2,
  },
  {
    homeTeam: "USA",
    awayTeam: "Paragwaj",
    kickoffAt: new Date("2026-06-12T23:00:00Z"),
    stage: "Faza grupowa",
    groupName: "Grupa D",
    matchOrder: 3,
  },
  {
    homeTeam: "Brazylia",
    awayTeam: "Maroko",
    kickoffAt: new Date("2026-06-13T19:00:00Z"),
    stage: "Faza grupowa",
    groupName: "Grupa C",
    matchOrder: 4,
  },
  {
    homeTeam: "Argentyna",
    awayTeam: "Algieria",
    kickoffAt: new Date("2026-06-14T01:00:00Z"),
    stage: "Faza grupowa",
    groupName: "Grupa J",
    matchOrder: 5,
  },
  {
    homeTeam: "Francja",
    awayTeam: "Senegal",
    kickoffAt: new Date("2026-06-14T19:00:00Z"),
    stage: "Faza grupowa",
    groupName: "Grupa I",
    matchOrder: 6,
  },
  {
    homeTeam: "Hiszpania",
    awayTeam: "Kostaryka",
    kickoffAt: new Date("2026-06-15T01:00:00Z"),
    stage: "Faza grupowa",
    groupName: "Grupa H",
    matchOrder: 7,
  },
  {
    homeTeam: "Niemcy",
    awayTeam: "Curacao",
    kickoffAt: new Date("2026-06-15T19:00:00Z"),
    stage: "Faza grupowa",
    groupName: "Grupa D",
    matchOrder: 8,
  },
  {
    homeTeam: "Anglia",
    awayTeam: "Ghana",
    kickoffAt: new Date("2026-06-16T01:00:00Z"),
    stage: "Faza grupowa",
    groupName: "Grupa L",
    matchOrder: 9,
  },
  {
    homeTeam: "Portugalia",
    awayTeam: "Urugwaj",
    kickoffAt: new Date("2026-06-16T19:00:00Z"),
    stage: "Faza grupowa",
    groupName: "Grupa K",
    matchOrder: 10,
  },
  {
    homeTeam: "Holandia",
    awayTeam: "Japonia",
    kickoffAt: new Date("2026-06-17T01:00:00Z"),
    stage: "Faza grupowa",
    groupName: "Grupa F",
    matchOrder: 11,
  },
  {
    homeTeam: "Polska",
    awayTeam: "Katar",
    kickoffAt: new Date("2026-06-17T19:00:00Z"),
    stage: "Faza grupowa",
    groupName: "Grupa E",
    matchOrder: 12,
  },
  {
    homeTeam: "Włochy",
    awayTeam: "Tunezja",
    kickoffAt: new Date("2026-06-18T01:00:00Z"),
    stage: "Faza grupowa",
    groupName: "Grupa G",
    matchOrder: 13,
  },
  {
    homeTeam: "Belgia",
    awayTeam: "Egipt",
    kickoffAt: new Date("2026-06-18T19:00:00Z"),
    stage: "Faza grupowa",
    groupName: "Grupa H",
    matchOrder: 14,
  },
  {
    homeTeam: "Kolumbia",
    awayTeam: "Szwajcaria",
    kickoffAt: new Date("2026-06-19T01:00:00Z"),
    stage: "Faza grupowa",
    groupName: "Grupa I",
    matchOrder: 15,
  },
  {
    homeTeam: "Meksyk",
    awayTeam: "Korea Południowa",
    kickoffAt: new Date("2026-06-22T19:00:00Z"),
    stage: "Faza grupowa",
    groupName: "Grupa A",
    matchOrder: 16,
  },
  {
    homeTeam: "USA",
    awayTeam: "Australia",
    kickoffAt: new Date("2026-06-23T01:00:00Z"),
    stage: "Faza grupowa",
    groupName: "Grupa D",
    matchOrder: 17,
  },
  {
    homeTeam: "Polska",
    awayTeam: "Holandia",
    kickoffAt: new Date("2026-06-24T19:00:00Z"),
    stage: "Faza grupowa",
    groupName: "Grupa E/F",
    matchOrder: 18,
  },
  {
    homeTeam: "Brazylia",
    awayTeam: "Francja",
    kickoffAt: new Date("2026-07-04T19:00:00Z"),
    stage: "1/8 finału",
    groupName: null,
    matchOrder: 19,
  },
  {
    homeTeam: "Argentyna",
    awayTeam: "Anglia",
    kickoffAt: new Date("2026-07-05T19:00:00Z"),
    stage: "1/8 finału",
    groupName: null,
    matchOrder: 20,
  },
  {
    homeTeam: "Hiszpania",
    awayTeam: "Niemcy",
    kickoffAt: new Date("2026-07-06T19:00:00Z"),
    stage: "1/4 finału",
    groupName: null,
    matchOrder: 21,
  },
  {
    homeTeam: "Portugalia",
    awayTeam: "Brazylia",
    kickoffAt: new Date("2026-07-10T19:00:00Z"),
    stage: "Półfinał",
    groupName: null,
    matchOrder: 22,
  },
  {
    homeTeam: "Argentyna",
    awayTeam: "Hiszpania",
    kickoffAt: new Date("2026-07-11T19:00:00Z"),
    stage: "Półfinał",
    groupName: null,
    matchOrder: 23,
  },
  {
    homeTeam: "TBD",
    awayTeam: "TBD",
    kickoffAt: new Date("2026-07-19T19:00:00Z"),
    stage: "Finał",
    groupName: null,
    matchOrder: 24,
  },
];

export async function runSeedDatabase() {
  if (!(await isAdmin())) {
    return { error: "Brak uprawnień administratora." };
  }

  try {
    const matchCount = await db.match.count();
    if (matchCount > 0) {
      return { error: "Baza danych została już zainicjalizowana (mecze już istnieją)." };
    }

    for (const match of matches) {
      await db.match.create({ data: match });
    }

    return { success: true, count: matches.length };
  } catch (error: any) {
    return { error: `Błąd seedowania: ${error.message || error}` };
  }
}
