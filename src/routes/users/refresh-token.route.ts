import { Request, Response } from "express";
import { getBearerToken, makeJWT } from "../../auth/jwt.js";
import { getTokenFromDb } from "../../db/queries/refresh-token.js";
import { UnAuthorizedError } from "../../middleware/custom-errors.js";
import { cfg } from "../../config.js";

export async function handlerTokenRefresh(req: Request, res: Response) {
  const refreshToken = getBearerToken(req);
  const token = await getTokenFromDb(refreshToken);

  const hasTokenExpired = +token.expiresAt < Date.now();

  if (!token || token.revokedAt || hasTokenExpired) {
    throw new UnAuthorizedError("Refresh Token is not valid or has expired");
  }

  const newAccessToken = makeJWT(
    token.userId,
    cfg.apiConfig.defaultExpTimeSeconds,
    cfg.apiConfig.jwtSecret,
  );

  res.status(200).json({
    token: newAccessToken,
  });
}
