import express from "express";
import { handlerReadiness } from "./routes/healthz/healthz.route.js";
import { middlewareLogResponses } from "./middleware/log-responses.middleware.js";
import { middlewareMetricsInc } from "./middleware/fileserver-hits.middleware.js";
import { handlerMetrics } from "./routes/metrics/metrics.route.js";
import { handlerReset } from "./routes/reset/reset.route.js";
import { asyncErrHandler, errorHandler } from "./middleware/error-handling.js";
import { handlerCreateUser } from "./routes/users/create-user.route.js";
import { handlerCreateChirp } from "./routes/chirps/create-chirp.js";
import { handlerGetAllChirps } from "./routes/chirps/get-all-chirps.js";
import { handlerGetChirpFromId } from "./routes/chirps/get-chirp-from-id.js";
import { handlerLoginUser } from "./routes/users/login-user.js";
import { handlerTokenRefresh } from "./routes/users/refresh-token.route.js";
import { handlerRevokeToken } from "./routes/users/revoke.route.js";
import { handlerUpdateUser } from "./routes/users/update-user.js";
import { handlerDeleteChirpFromId } from "./routes/chirps/delete-chirp.js";
import { handlerUpgradeToRed } from "./routes/users/upgrade-to-chirpy-red.js";

const app = express();
const PORT = 8080;

app.use(middlewareLogResponses);
app.use(express.json());

app.use("/app", middlewareMetricsInc);
app.use("/app", express.static("./src/app"));

app.get("/api/healthz", asyncErrHandler(handlerReadiness));
// app.post("/api/validate_chirp", asyncErrHandler(handlerValidateChirp));
app.post("/api/users", asyncErrHandler(handlerCreateUser));
app.put("/api/users", asyncErrHandler(handlerUpdateUser));

app.post("/api/login", asyncErrHandler(handlerLoginUser));
app.post("/api/refresh", asyncErrHandler(handlerTokenRefresh));
app.post("/api/revoke", asyncErrHandler(handlerRevokeToken));

app.post("/api/chirps", asyncErrHandler(handlerCreateChirp));
app.get("/api/chirps", asyncErrHandler(handlerGetAllChirps));

app.get("/api/chirps/:chirpId", asyncErrHandler(handlerGetChirpFromId));
app.delete("/api/chirps/:chirpId", asyncErrHandler(handlerDeleteChirpFromId));

app.post("/api/polka/webhooks", asyncErrHandler(handlerUpgradeToRed));

app.get("/admin/metrics", asyncErrHandler(handlerMetrics));
app.post("/admin/reset", asyncErrHandler(handlerReset));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
