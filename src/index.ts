import express from "express";
import path from "path";
import { handlerReadiness } from "./routes/healthz/healthz.route.js";
import { middlewareLogResponses } from "./middleware/log-responses.middleware.js";
import { middlewareMetricsInc } from "./middleware/fileserver-hits.middleware.js";
import { handlerMetrics } from "./routes/metrics/metrics.route.js";
import { handlerReset } from "./routes/reset/reset.route.js";
import { handlerValidateChirp } from "./routes/chirps/validate-chirp.js";
import { asyncErrHandler, errorHandler } from "./middleware/error-handling.js";

const app = express();
const PORT = 8080;

app.use(middlewareLogResponses);
app.use(express.json());

app.use("/app", middlewareMetricsInc);
app.use("/app", express.static("./src/app"));

app.get("/api/healthz", asyncErrHandler(handlerReadiness));
app.post("/api/validate_chirp", asyncErrHandler(handlerValidateChirp));

app.get("/admin/metrics", asyncErrHandler(handlerMetrics));
app.post("/admin/reset", asyncErrHandler(handlerReset));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
