const express = require("express");
const { route } = require("./productsRouter");

const router = express.Router()

router.get("/", (req, res)=> {
    //ahora usamos la parte del request en su propiedad query y obtenemos su limit y offset
    const { limit, offset } = req.query;
    if (limit && offset) {
        res.json({
            limit,
            offset,
            query: "usando Parametros Query"
        });
    } else {
        res.send("no hay parametros");
    }
})

router.post("/", (req, res) => {
    const body = req.body;
    const newProduct = service.create(body);
    res.status(201).json(newProduct);
})

router.patch("/:id", (req, res) => {
    const { id } = req.params;
    const body = req.body;
    res.json({
        message: "Usuario Actualizado",
        id, 
        data: body
    })
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    res.json({
        message: "Usuario eliminado",
        id
    })
})

module.exports = router;