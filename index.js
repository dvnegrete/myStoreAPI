const express = require("express");
const routerApi = require("./routes");

const app = express();
const port = 3500;

//middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Bienvenido a mi servidor en express");
});

routerApi(app);

app.listen(port, ()=> console.log("Servidor express listo en el puerto:" + port));