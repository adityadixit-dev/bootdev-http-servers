import bcrypt from "bcrypt";
import { cfg } from "../config.js";
import { Request } from "express";
import { UnAuthorizedError } from "../middleware/custom-errors.js";

export async function hashPassword(password: string) {
  try {
    const hashedPassword = await bcrypt.hash(
      password,
      cfg.apiConfig.saltRounds,
    );
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
}

export async function checkPasswordHash(
  password: string,
  hash: string,
): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    throw new Error("Could not compare the password to the hash");
  }
}

export function getAPIKey(req: Request) {
  const authHeader = req.get("Authorization");
  if (!authHeader || typeof authHeader !== "string") {
    throw new UnAuthorizedError("Authorization Header Invalid type");
  }

  const splitHeader = authHeader.split(" ");
  if (
    splitHeader.length !== 2 ||
    splitHeader[0].toLowerCase() !== "apikey" ||
    !splitHeader[1]
  ) {
    throw new UnAuthorizedError("Authorization Header Invalid Format");
  }

  return splitHeader[1];
}
