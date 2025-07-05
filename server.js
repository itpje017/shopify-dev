require("dotenv").config();
require("module-alias/register");

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express.json({ limit: "2mb", verify: (req, res, buf) => { req.rawBody = buf.toString() } }));
app.use(express.urlencoded({ extended: true, verify: (req, res, buf) => { req.rawBody = buf.toString()} }));

// CORS Setup
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
  credentials: true,
}));

// Session Configuration (for your own backend APIs, if needed)
app.use(session({
  secret: process.env.SESSION_SECRET || "production_secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  },
}));

// Your custom backend routes
app.use(require('./router/router'));
// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
