// GLobal middleware felhanterare
// Fångar fel som kastat i appen, loggar dom, skicka json svar till klienten
// Kom ihåg att lägga denna middleware sist i middleware kedjan , så att den fångar upp ALLA fel.

import { logger } from "./logger.js";

function errorHandler(err, req, res, next) {
  logger.error(`Fel!: ${err.message}`);

  const status = res.statusCode >= 400 ? res.statusCode : 500;

  res.status(status).json({
    error: status >= 500 ? "Serverfel" : "Fel",
    status,
    message: err.message,
  });
}

export default errorHandler;
