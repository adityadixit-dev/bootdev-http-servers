import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { type NewUser, users } from "../schema.js";

export type ReturnUser = Omit<NewUser, "hashedPassword">;

export async function getUserFromEmail(email: string) {
  const [result] = await db.select().from(users).where(eq(users.email, email));
  return result;
}

export async function createUser(user: NewUser) {
  const [result] = await db
    .insert(users)
    .values(user)
    .onConflictDoNothing()
    .returning({
      id: users.id,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      email: users.email,
    });

  return result;
}

export async function deleteAllUsers() {
  await db.delete(users);
}
