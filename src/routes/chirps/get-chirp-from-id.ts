import { Request, Response } from "express";
import { getChirpFromId } from "../../db/queries/chirps.js";
import { NotFoundError } from "../../middleware/custom-errors.js";

export async function handlerGetChirpFromId(req: Request, res: Response) {
  const chirpId = req.params.chirpId;
  if (!chirpId) {
    throw new Error("Chirp ID is needed");
  }

  const chirp = await getChirpFromId(chirpId);
  if (!chirp) {
    throw new NotFoundError("Chirp Not Found");
  }

  res.status(200).json(chirp);
  return;
}
