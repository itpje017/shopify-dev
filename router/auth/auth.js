const express = require("express");
const app = express.Router();
const authController = require("@authController/auth");
const path = require("./authPath");

app.get("/", authController.getAuth);
app.get(`/${path.AUTH_INSTALLATION_ACTION_URL}`, authController.oAuthInstallation);
app.get(`/${path.AUTH_CALLBACK_ACTION_URL}`, authController.oAuthCallback);



module.exports = app;
