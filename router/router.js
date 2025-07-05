const express = require("express");
const app = express.Router();


app.use(require("./auth/auth"));
app.use(require("./product/product"));
app.use(require("./product/webhook"));
app.use(require("./order/order"));
app.use("/webhooks", require("./webhook/gdpr"));

module.exports = app;