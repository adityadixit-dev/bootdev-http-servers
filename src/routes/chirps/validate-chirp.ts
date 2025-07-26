import { Request, Response } from "express";
import { BadRequestError } from "../../middleware/custom-errors.js";

const MAX_CHIRP_LENGTH = 140;
const BAD_WORDS_ARRAY = ["kerfuffle", "sharbert", "fornax"];
type ChirpParameters = {
  body: string;
};

export async function handlerValidateChirp(req: Request, res: Response) {
  try {
    const parsedBody: ChirpParameters = req.body;

    if (!validateChirpLength(parsedBody)) {
      throw new BadRequestError(
        `Chirp is too long. Max length is ${MAX_CHIRP_LENGTH}`,
      );
    }

    const cleanedBody = cleanChirp(parsedBody.body);

    res.status(200).json({
      cleanedBody,
    });
  } catch (err) {
    throw err;
  }

  res.end();
}

function cleanChirp(body: string): string {
  const splitWords = body.split(" ");
  const cleanedWords = splitWords.map((word) => {
    if (BAD_WORDS_ARRAY.includes(word.toLowerCase())) {
      return "****";
    }
    return word;
  });

  return cleanedWords.join(" ");
}

function validateChirpLength(parsedBody: ChirpParameters): boolean {
  if (!parsedBody.body || typeof parsedBody.body !== "string") {
    throw new BadRequestError("Request does not contain body");
  } else if (parsedBody.body.length > MAX_CHIRP_LENGTH) {
    return false;
  }
  return true;
}
