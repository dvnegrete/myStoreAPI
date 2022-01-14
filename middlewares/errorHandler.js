function logErrors (err, req, res, next) {
  console.log("logErrors");
  console.log(err);
  next(err);
  //aqui estamos ejecutando un middleware de tipo error
}

//middleware para crear un standar de formato al error de la App
function errorHandler (err, req, res, next) {
  console.log("errorHandler");
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

//manejo de errores con la libreria boom
function boomErrorHandler (err, req, res, next) {
  console.log("boomErrorHandler");
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}
module.exports = { logErrors, errorHandler, boomErrorHandler };
