import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { ChirpInsert, chirps } from "../schema.js";

export async function createChirp(chirp: ChirpInsert) {
  console.log("Creating Chirp");
  console.log(chirp);

  const [result] = await db.insert(chirps).values(chirp).returning();
  return result;
}

export async function getAllChirps() {
  const results = await db.select().from(chirps).orderBy(chirps.createdAt);
  return results;
}

export async function getChirpFromId(chirpId: string) {
  try {
    const [chirp] = await db
      .select()
      .from(chirps)
      .where(eq(chirps.id, chirpId));
    return chirp;
  } catch (error) {
    return undefined;
  }
}
