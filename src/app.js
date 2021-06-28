if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());

// Not found handler
app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = 'Something went wrong!' } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
