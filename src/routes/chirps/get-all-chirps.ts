import { Request, Response } from "express";
import { getAllChirps, getChirpsByAuthor } from "../../db/queries/chirps.js";
import { NotFoundError } from "../../middleware/custom-errors.js";

export async function handlerGetAllChirps(req: Request, res: Response) {
  const authorId =
    typeof req.query?.authorId === "string" ? req.query.authorId : null;

  const sortType = req.query?.sort === "desc" ? "desc" : "asc";

  if (authorId) {
    console.log(`AUTHOR ID = ${authorId}`);
    const chirpsByAuthor = await getChirpsByAuthor(authorId);
    if (!chirpsByAuthor) {
      throw new NotFoundError("No Chirps found");
    }
    res.status(200).json(chirpsByAuthor);
  } else {
    console.log(`Calling GET ALL CHIRPS`);
    const allChirps = await getAllChirps(sortType);
    res.status(200).json(allChirps);
  }
}
