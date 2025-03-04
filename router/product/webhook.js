const express = require("express");
const app = express.Router();
const webhookController = require("@productController/webhook");
const path = require("./productPath");


app.post(`/${path.PRODUCT_WEBHOOK_URL}`, webhookController.productWebhook);

module.exports = app;