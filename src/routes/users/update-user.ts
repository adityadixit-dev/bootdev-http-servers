import { Request, Response } from "express";
import { getBearerToken, validateJWT } from "../../auth/jwt.js";
import { cfg } from "../../config.js";
import {
  BadRequestError,
  UnAuthorizedError,
} from "../../middleware/custom-errors.js";
import { hashPassword } from "../../auth/auth.js";
import { updateUser } from "../../db/queries/user.js";

export async function handlerUpdateUser(req: Request, res: Response) {
  const reqToken = getBearerToken(req);
  const userId = validateJWT(reqToken, cfg.apiConfig.jwtSecret);

  if (!reqToken || !userId) {
    throw new UnAuthorizedError("Bad Token or missing authorizations");
  }

  const userData = req.body;

  if (!userData.email || !userData.password) {
    throw new BadRequestError("All fields are required");
  }

  const hashedPassword = await hashPassword(userData.password);

  const updatedUser = await updateUser({
    id: userId,
    email: userData.email,
    hashedPassword: hashedPassword,
  });

  if (!updatedUser) {
    throw new Error("Unable to update User");
  }

  res.status(200).json(updatedUser);
}
