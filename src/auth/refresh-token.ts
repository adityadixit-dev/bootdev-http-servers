import { randomBytes } from "crypto";

export function makeRefreshToken(): string {
  const refreshToken = randomBytes(256).toString("hex");

  return refreshToken;
}
