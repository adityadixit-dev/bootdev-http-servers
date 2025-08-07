import { Request, Response } from "express";
import { upgradeUserToChirpyRed } from "../../db/queries/user.js";
import {
  NotFoundError,
  UnAuthorizedError,
} from "../../middleware/custom-errors.js";
import { getAPIKey } from "../../auth/auth.js";
import { cfg } from "../../config.js";

export type PolkaData = {
  event: string;
  data: {
    userId: string;
  };
};

export async function handlerUpgradeToRed(req: Request, res: Response) {
  const apiKey = getAPIKey(req);
  if (apiKey !== cfg.apiConfig.polkaKey) {
    throw new UnAuthorizedError("Api Key Invalid");
  }
  const polkaData: PolkaData = req.body;

  if (polkaData.event !== "user.upgraded") {
    res.status(204);
    res.end();
    return;
  }

  try {
    const result = await upgradeUserToChirpyRed(polkaData.data?.userId);

    if (!result) {
      throw new NotFoundError("User not Found for upgrade");
    }
    res.status(204).json({});
    res.end();
  } catch (err) {
    throw new NotFoundError("User not Found for upgrade");
  }
}
