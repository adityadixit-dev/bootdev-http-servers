import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { cfg } from "../../config.js";
import { refreshTokens } from "../schema.js";

export async function revokeRefreshToken(refreshToken: string) {
  const [result] = await db
    .update(refreshTokens)
    .set({
      revokedAt: new Date(Date.now()),
    })
    .where(eq(refreshTokens.token, refreshToken))
    .returning();
  return result;
}

export async function addRefreshTokenForUser(
  refreshToken: string,
  userId: string,
) {
  const expiryDate = new Date(
    Date.now() + cfg.apiConfig.refreshTokenExpTimeSecs * 1000,
  );

  const [result] = await db
    .insert(refreshTokens)
    .values({
      token: refreshToken,
      userId: userId,
      expiresAt: expiryDate,
    })
    .onConflictDoNothing()
    .returning();

  return result;
}

export async function getTokenFromDb(refreshToken: string) {
  const [result] = await db
    .select()
    .from(refreshTokens)
    .where(eq(refreshTokens.token, refreshToken));

  return result;
}
