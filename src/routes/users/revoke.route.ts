import { Request, Response } from "express";
import { getBearerToken } from "../../auth/jwt.js";
import { revokeRefreshToken } from "../../db/queries/refresh-token.js";

export async function handlerRevokeToken(req: Request, res: Response) {
  const refreshTokenToRevoke = getBearerToken(req);
  const result = await revokeRefreshToken(refreshTokenToRevoke);
  if (!result) {
    throw new Error("Unable to Revoke Refresh Token");
  }

  res.status(204);
  res.end();
}
