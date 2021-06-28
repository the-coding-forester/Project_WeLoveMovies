if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");


//Handlers
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");



//Routers


//Use JSON format for data return
app.use(express.json());

//Use CORS to allow all incoming requests
app.use(cors());

//Direct request based on URL



// Not found handler
app.use(notFound);


// Error handler
app.use(errorHandler);

module.exports = app;
