const express = require("express");
const app = express.Router();
const productController = require("@productController/product");
const path = require("./productPath");

app.post(`/${path.PRODUCT_ACTION_URL}`, productController.createProduct);

app.post(`/update-price`, productController.updateProductPrice);

module.exports = app;