// En inbyggd middleware
import express from "express";

// Inportera 3:e parts middleware:
import morgan from "morgan"; //middleware för loggning

// Egenskapade middlewares
import requestCounter from "./middleware/requestCounter.js";
import { logRequest } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = 3210;

// Inbyggd middleware
app.use(express.json());

app.use(morgan("dev"));

// Egenskapade middleware:

// Denna middleware för att skriva ut alla loggar, till en fil och till consolen
app.use(logRequest);

// Visa att den här middlewaren körs varje gång
app.use(requestCounter);

app.get("/hej", (req, res, next) => {
  const somethingWrong = true;
  if (somethingWrong) {
    res.status(404);
    return next(new Error("Hittades inte"));
  }
  res.send("HEJ");
});
app.get("/error", (req, res) => {
  throw new Error("Simulerat serverfel....");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
