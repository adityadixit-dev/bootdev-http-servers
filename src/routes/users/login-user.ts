import { Request, Response } from "express";
import {
  BadRequestError,
  UnAuthorizedError,
} from "../../middleware/custom-errors.js";
import { getUserFromEmail } from "../../db/queries/user.js";
import { checkPasswordHash } from "../../auth/auth.js";
import { makeJWT } from "../../auth/jwt.js";
import { cfg } from "../../config.js";
import { makeRefreshToken } from "../../auth/refresh-token.js";
import { addRefreshTokenForUser } from "../../db/queries/refresh-token.js";

type LoginFields = {
  email: string;
  password: string;
};

export async function handlerLoginUser(req: Request, res: Response) {
  const loginData: LoginFields = req.body;

  if (!loginData.email || !loginData.password) {
    throw new BadRequestError("Email and Password Required");
  }

  const user = await getUserFromEmail(loginData.email);
  if (!user) {
    throw new UnAuthorizedError("Could Not find User");
  }

  const doPasswordsMatch = await checkPasswordHash(
    loginData.password,
    user.hashedPassword,
  );
  if (!doPasswordsMatch) {
    throw new UnAuthorizedError("Incorrect email or password");
  }

  const timeToExpiry: number = cfg.apiConfig.defaultExpTimeSeconds;

  const newJwToken = makeJWT(user.id, timeToExpiry, cfg.apiConfig.jwtSecret);
  const newRefreshToken = makeRefreshToken();
  const refreshTokenResult = addRefreshTokenForUser(newRefreshToken, user.id);

  if (!refreshTokenResult) {
    throw new Error("Unable to create refresh token");
  }

  res.status(200).json({
    id: user.id,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    email: user.email,
    isChirpyRed: user.isChirpyRed,
    token: newJwToken,
    refreshToken: newRefreshToken,
  });
}
