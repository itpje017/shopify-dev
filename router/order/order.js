const express = require("express");
const app = express.Router();

const orderController = require("@orderController/order");
const path = require("./orderPath");

// create order

app.post(`/${path.ORDER_DETAILS_ACTION_URL}`, orderController.orders);




module.exports = app;