import { Request, Response } from "express";
import { BadRequestError } from "../../middleware/custom-errors.js";

export const MAX_CHIRP_LENGTH = 140;
const BAD_WORDS_ARRAY = ["kerfuffle", "sharbert", "fornax"];
type ChirpParameters = {
  body: string;
};

export function cleanChirp(body: string): string {
  const splitWords = body.split(" ");
  const cleanedWords = splitWords.map((word) => {
    if (BAD_WORDS_ARRAY.includes(word.toLowerCase())) {
      return "****";
    }
    return word;
  });

  return cleanedWords.join(" ");
}

export function validateChirpLength(parsedBody: ChirpParameters): boolean {
  if (!parsedBody.body || typeof parsedBody.body !== "string") {
    throw new BadRequestError("Request does not contain body");
  } else if (parsedBody.body.length > MAX_CHIRP_LENGTH) {
    return false;
  }
  return true;
}
