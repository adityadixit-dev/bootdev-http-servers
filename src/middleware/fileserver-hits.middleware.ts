import { NextFunction, Request, Response } from "express";
import { cfg } from "../config.js";

export function middlewareMetricsInc(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  cfg.apiConfig.fileserverHits++;

  next();
}
