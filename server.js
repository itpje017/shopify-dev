require("dotenv").config();
require("module-alias/register");

const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({limit: '2mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

// CORS Setup (Modify Allowed Origins as Needed)
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : "*",
  credentials: true,
}));

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || "production_secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true, sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, 
  }
}));

// router
app.use(require('./router/router'));

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Internal Server Error" });
});


app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
