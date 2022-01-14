const express = require("express");
const routerApi = require("./routes");

const { logErrors, errorHandler, boomErrorHandler } = require("./middlewares/errorHandler");

const app = express();
const port = 3500;

//middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Bienvenido a mi servidor en express");
});

routerApi(app);
//usar los middlewares despues del ruteo

//middleware para manejode errores
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, ()=> {
  console.log("Servidor express listo en el puerto:" + port)});
