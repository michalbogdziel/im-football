# Mundial 2026 — Portal typów firmowych

Portal pracowniczy do obstawiania wyników Mistrzostw Świata 2026. Zawiera logowanie/rejestrację, typowanie wyników przed meczami, ranking punktowy i panel administratora.

## Funkcje

- **Logowanie / rejestracja** — Clerk (e-mail, Google, Microsoft itd.)
- **Typy meczów** — podawanie wyników przed pierwszym gwizdkiem
- **Ranking** — klasyfikacja graczy według zdobytych punktów
- **Panel admina** — wprowadzanie wyników meczów i automatyczne przeliczanie punktów

## System punktacji

| Punkty | Warunek |
|--------|---------|
| 3 | Dokładny wynik |
| 2 | Poprawna różnica bramek lub poprawny remis |
| 1 | Poprawny wynik (zwycięzca) |
| 0 | Brak trafienia |

## Wymagania

- Node.js 20+
- Konto [Clerk](https://clerk.com) (darmowy plan wystarczy)
- Baza PostgreSQL (np. [Neon](https://neon.tech), [Supabase](https://supabase.com) lub Vercel Postgres)

## Szybki start (lokalnie)

```bash
# 1. Zainstaluj zależności
npm install

# 2. Skopiuj i uzupełnij zmienne środowiskowe
cp .env.example .env.local

# 3. Wygeneruj klienta Prisma
npm run db:generate

# 4. Uruchom migracje bazy danych
npm run db:migrate

# 5. Załaduj przykładowe mecze
npm run db:seed

# 6. Uruchom serwer deweloperski
npm run dev
```

Aplikacja będzie dostępna pod adresem [http://localhost:3000](http://localhost:3000).

## Konfiguracja Clerk

1. Utwórz aplikację na [dashboard.clerk.com](https://dashboard.clerk.com)
2. Skopiuj klucze `Publishable key` i `Secret key` do `.env.local`
3. W Clerk Dashboard → **Configure** → **Restrictions** możesz ograniczyć rejestrację do domeny firmowej (np. `@twojafirma.pl`)

## Wdrożenie na Vercel

1. Wypchnij repozytorium na GitHub
2. Zaimportuj projekt w [vercel.com](https://vercel.com)
3. Dodaj zmienne środowiskowe z `.env.example`
4. Utwórz bazę PostgreSQL (Vercel Postgres, Neon lub Supabase) i ustaw `DATABASE_URL`
5. Po wdrożeniu uruchom migracje:

```bash
npx prisma migrate deploy
npm run db:seed
```

## Panel administratora

Użytkownicy z adresem e-mail wymienionym w `ADMIN_EMAILS` mają dostęp do `/admin`, gdzie mogą wprowadzać wyniki meczów.

## Struktura projektu

```
src/
├── app/
│   ├── page.tsx          # Strona główna
│   ├── dashboard/        # Panel użytkownika
│   ├── typy/             # Typowanie wyników
│   ├── ranking/          # Ranking graczy
│   ├── admin/            # Panel administratora
│   └── sign-in/ sign-up/ # Logowanie Clerk
├── components/           # Komponenty UI
└── lib/                  # Logika biznesowa, baza, auth
```

## Skrypty

| Skrypt | Opis |
|--------|------|
| `npm run dev` | Serwer deweloperski |
| `npm run build` | Build produkcyjny |
| `npm run db:generate` | Generowanie klienta Prisma |
| `npm run db:migrate` | Migracje bazy danych |
| `npm run db:seed` | Załadowanie meczów Mundialu 2026 |
| `npm run db:studio` | Prisma Studio (podgląd bazy) |
