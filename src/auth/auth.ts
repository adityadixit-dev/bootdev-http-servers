import bcrypt from "bcrypt";
import { cfg } from "../config.js";

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
