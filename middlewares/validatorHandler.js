const boom = require("@hapi/boom");

function validatorHandler(schema, property) {
  //construir un middleware de forma dinamica, utilizando clousures
  return (req, res, next) => {
    //como la informacion puede venir de distintos lados, usaremos req en su posicion property, para hacerlo dinamico
    const data = req[property];
    const { error }= schema.validate(data, {aboutEarly: false});
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
