import { Request, Response } from "express";
import { ChirpInsert } from "../../db/schema.js";
import {
  BadRequestError,
  UnAuthorizedError,
} from "../../middleware/custom-errors.js";
import { createChirp } from "../../db/queries/chirps.js";
import { cleanChirp, validateChirpLength } from "./validate-chirp.js";
import { MAX_CHIRP_LENGTH } from "./validate-chirp.js";
import { getBearerToken, validateJWT } from "../../auth/jwt.js";
import { cfg } from "../../config.js";

export async function handlerCreateChirp(req: Request, res: Response) {
  const chirpData: ChirpInsert = req.body;
  const reqToken = getBearerToken(req);

  if (!chirpData.body) {
    throw new BadRequestError("Missing Fields in Request for ChirpData");
  }

  if (!validateChirpLength({ body: chirpData.body })) {
    throw new BadRequestError(
      `Chirp is too long. Max length is ${MAX_CHIRP_LENGTH}`,
    );
  }

  const userId = validateJWT(reqToken, cfg.apiConfig.jwtSecret);

  // if (userId !== chirpData.userId) {
  //   throw new UnAuthorizedError("Not Authorized");
  // }

  const cleanedChirpBody = cleanChirp(chirpData.body);

  const newChirp = await createChirp({
    body: cleanedChirpBody,
    userId: userId,
  });

  if (!newChirp) {
    throw new Error("Unable To create Chirp");
  }

  res.status(201).json(newChirp);
}
