import { Request, Response } from "express";
import { cfg } from "../../config.js";

export async function handlerReset(_req: Request, res: Response) {
  cfg.fileserverHits = 0;
  res.set("Content-Type", "text/plain; charset=utf-8");
  res.send("OK");
  return;
}
