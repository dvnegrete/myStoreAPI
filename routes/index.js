const productsRouter = require("./productsRouter.js");
const userRouter = require("./userRouter.js");
const categoriesRouter = require("./categoriesRouter.js");
const express = require("express");

function routerApi(app) {
    const router = express.Router();
    app.use("/api/v1", router)
    router.use("/products", productsRouter);
    router.use("/user", userRouter);
    router.use("/categories", categoriesRouter);
}

module.exports = routerApi;