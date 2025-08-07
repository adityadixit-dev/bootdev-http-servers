import { Request, Response } from "express";
import { getBearerToken, validateJWT } from "../../auth/jwt.js";
import { cfg } from "../../config.js";
import { deleteChirp, getChirpFromId } from "../../db/queries/chirps.js";
import {
  ForbiddedError,
  NotFoundError,
} from "../../middleware/custom-errors.js";

export async function handlerDeleteChirpFromId(req: Request, res: Response) {
  const reqToken = getBearerToken(req);
  const userId = validateJWT(reqToken, cfg.apiConfig.jwtSecret);

  const chirpId = req.params.chirpId;
  if (!chirpId) {
    throw new Error("Chirp ID not found");
  }

  const chirp = await getChirpFromId(chirpId);
  if (!chirp) {
    throw new NotFoundError("Chirp Not Found");
  }

  if (chirp.userId !== userId) {
    throw new ForbiddedError("Chirp does not belong to user");
  }

  const deletedChirpID = await deleteChirp(chirpId);
  console.log(`deleted Chirp = ${deletedChirpID}`);

  if (!deletedChirpID) {
    throw new Error("Something went wrong");
  }

  res.status(204);
  res.end();
}
