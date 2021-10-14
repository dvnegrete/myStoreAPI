const { application } = require("express");
const express = require("express");

const router = express.Router()

router.get("/", (req, res) => {
    res.send("Ingresa una categoria valida")
})

router.get("/:categoryId/products/:productId", (req, res)=> {
    const { categoryId, productId } = req.params;
    res.json({
        categoryId,
        productId
    })
})

module.exports = router;