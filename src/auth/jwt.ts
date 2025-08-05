import jwt, { JwtPayload } from "jsonwebtoken";
import { UnAuthorizedError } from "../middleware/custom-errors.js";
import { Request } from "express";

type PayloadForJWT = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;

export function makeJWT(
  userID: string,
  expiresIn: number,
  secret: string,
): string {
  const payload: PayloadForJWT = {
    iss: "chirpy",
    sub: userID,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expiresIn,
  };

  const token = jwt.sign(payload, secret);
  return token;
}

export function validateJWT(tokenString: string, secret: string): string {
  try {
    const verifyResult = jwt.verify(tokenString, secret) as PayloadForJWT;
    if (!verifyResult.sub || typeof verifyResult.sub !== "string") {
      throw new UnAuthorizedError("User ID invalid");
    }
    return verifyResult.sub;
  } catch (err) {
    throw new UnAuthorizedError("Invalid JWT");
  }
}

export function getBearerToken(req: Request): string {
  const authHeader = req.get("Authorization");
  const bearerToken = getTokenFromHeader(authHeader);
  return bearerToken;
}

function getTokenFromHeader(authHeader: string | undefined): string {
  if (!authHeader || typeof authHeader !== "string") {
    throw new UnAuthorizedError("Invalid Authtoken Type");
  }

  const splitToken = authHeader.split(" ");

  if (
    splitToken.length !== 2 ||
    splitToken[0].toLowerCase() !== "bearer" ||
    !splitToken[1]
  ) {
    throw new UnAuthorizedError("Invalid Authtoken format");
  }

  return splitToken[1];
}
