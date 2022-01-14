const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");

const { logErrors, errorHandler, boomErrorHandler } = require("./middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 3500;

//middleware
app.use(express.json());
//aqui definir la lista de dominios que se conectaran a nuestro sitio
const whitelist = ["http://localhost:8080", "http://myapp.com"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback( new Error ("no permitido"))
    }
  }
}
app.use(cors(options))

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
