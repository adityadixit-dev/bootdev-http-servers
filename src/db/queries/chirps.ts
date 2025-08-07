import { eq, desc } from "drizzle-orm";
import { db } from "../index.js";
import { ChirpInsert, chirps } from "../schema.js";

export async function createChirp(chirp: ChirpInsert) {
  console.log("Creating Chirp");
  console.log(chirp);

  const [result] = await db.insert(chirps).values(chirp).returning();
  return result;
}

export async function getChirpsByAuthor(authorId: string) {
  const results = await db
    .select()
    .from(chirps)
    .where(eq(chirps.userId, authorId))
    .orderBy(chirps.createdAt);

  return results;
}

export async function getAllChirps(sortType: "asc" | "desc") {
  if (sortType === "desc") {
    const results = await db
      .select()
      .from(chirps)
      .orderBy(desc(chirps.createdAt));
    return results;
  }

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

export async function deleteChirp(chirpId: string) {
  console.log(`Trying to delete chirp - ${chirpId}`);
  try {
    console.log(`In try block`);
    const [result] = await db
      .delete(chirps)
      .where(eq(chirps.id, chirpId))
      .returning({
        id: chirps.id,
      });
    console.log(`Result = ${result}`);
    return result;
  } catch (err) {
    console.log(`Catching Error while deleting chirp`);
    return undefined;
  }
}
