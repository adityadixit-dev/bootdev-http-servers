import { Request, Response } from "express";
import { cfg } from "../../config.js";
import { ForbiddedError } from "../../middleware/custom-errors.js";
import { deleteAllUsers } from "../../db/queries/user.js";

export async function handlerReset(_req: Request, res: Response) {
  if (cfg.apiConfig.platform !== "dev") {
    throw new ForbiddedError("No No No no nooo");
  }

  deleteAllUsers();

  cfg.apiConfig.fileserverHits = 0;
  res.set("Content-Type", "text/plain; charset=utf-8");
  res.send("OK");
  return;
}
