import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function getOrCreateUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const email =
    clerkUser.emailAddresses.find((e) => e.id === clerkUser.primaryEmailAddressId)
      ?.emailAddress ?? clerkUser.emailAddresses[0]?.emailAddress ?? "";

  const name =
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
    clerkUser.username ||
    email.split("@")[0] ||
    "Gracz";

  return db.user.upsert({
    where: { clerkId: userId },
    update: { email, name },
    create: { clerkId: userId, email, name },
  });
}

export async function isAdmin(): Promise<boolean> {
  const clerkUser = await currentUser();
  if (!clerkUser) return false;

  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const email =
    clerkUser.emailAddresses.find((e) => e.id === clerkUser.primaryEmailAddressId)
      ?.emailAddress ?? "";

  return adminEmails.includes(email.toLowerCase());
}

export function isMatchLocked(kickoffAt: Date): boolean {
  return new Date() >= kickoffAt;
}
