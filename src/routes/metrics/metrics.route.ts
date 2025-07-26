import { Request, Response } from "express";
import { cfg } from "../../config.js";

export async function handlerMetrics(req: Request, res: Response) {
  res.set("Content-Type", "text/html; charset=utf-8");
  const htmlToSend = `
<html>
  <body>
    <h1>Welcome, Chirpy Admin</h1>
    <p>Chirpy has been visited ${cfg.fileserverHits} times!</p>
  </body>
</html>
`;
  res.send(htmlToSend);

  return;
}
