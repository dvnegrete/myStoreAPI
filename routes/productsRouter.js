const express = require("express");
const validatorHandler = require("../middlewares/validatorHandler");
const { createProductSchema, updateProductSchema, getProductSchema } = require("./../schema/productSchema");

const ProductsServices = require("../services/productsServices");
const { get } = require("express/lib/request");

const router = express.Router();
const service = new ProductsServices();

router.get("/", async (req, res) =>{
    const products = await service.find();
    res.status(200).json(products);
})

//para que no genere filter como un parametro, solo hay que declararlo antes en el codigo, que los ID
router.get("/filter", (req, res)=> {
    res.status(200).send("Entraste a filter");
})

router.get("/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } =req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
)

router.post("/",
  validatorHandler(createProductSchema, "body"),
   async (req, res) => {
    const body = req.body;
    const newProduct =  await service.create(body);
    res.status(201).json(newProduct);
  }
)

router.patch("/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.status(202).json(product);
    } catch (error) {
      next(error)
    }
  }
)

router.put("/:id", async (req, res) => {
  const { id } = req. params;
  const body = req.body;
  //que tipo de service sera: update?
  const product = await service.update(id, body);
  res.status(202).json(product);
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deleteProduct = await service.delete(id);
    res.status(200).json(deleteProduct);
})

module.exports = router;
