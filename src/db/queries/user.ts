import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { type NewUser, users } from "../schema.js";

export type ReturnUser = Omit<NewUser, "hashedPassword">;

export async function upgradeUserToChirpyRed(userId: string) {
  const [result] = await db
    .update(users)
    .set({
      isChirpyRed: true,
    })
    .where(eq(users.id, userId))
    .returning({
      id: users.id,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      email: users.email,
      isChirpyRed: users.isChirpyRed,
    });
  return result;
}

export async function getUserFromEmail(email: string) {
  const [result] = await db.select().from(users).where(eq(users.email, email));
  return result;
}

export type UpdateUser = Pick<NewUser, "id" | "email" | "hashedPassword">;

export async function updateUser(user: Required<UpdateUser>) {
  const [result] = await db
    .update(users)
    .set({
      email: user.email,
      hashedPassword: user.hashedPassword,
    })
    .where(eq(users.id, user.id))
    .returning({
      id: users.id,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      email: users.email,
      isChirpyRed: users.isChirpyRed,
    });
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
      isChirpyRed: users.isChirpyRed,
    });

  return result;
}

export async function deleteAllUsers() {
  await db.delete(users);
}
