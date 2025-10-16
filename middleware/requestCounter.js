let reqoustCount = 0;

function requestCounter(req, res, next) {
  reqoustCount++;

  console.log(`Totalt antal inkommande requests: ${reqoustCount}`);

  next();
}

export default requestCounter;
