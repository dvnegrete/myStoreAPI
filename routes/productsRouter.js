const express = require("express");

const ProductsServices = require("./../services/productsServices.js")

const router = express.Router();
const servicio = new ProductsServices();

router.get("/", (req, res) =>{
    const products = servicio;
    res.status(200).json(products);
})

//para que no genere filter como un parametro, solo hay que declararlo antes en el codigo, que los ID
router.get("/filter", (req, res)=> {
    res.status(200).send("Entraste a filter");
})

router.get("/:id", (req, res) => {    
    const { id } =req.params;
    const product = servicio.findOne(id)
    res.status(200).json(product)        
})

router.post("/", (req, res) => {    
    const body = req.body;
    const newProduct = servicio.create(body);
    res.status(201).json(newProduct);
})

router.patch("/:id", (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const product = servicio.update(id, body);
    res.status(202).json(product);
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const deleteProduct = servicio.delete(id);
    res.status(200).json(deleteProduct);
})

module.exports = router;