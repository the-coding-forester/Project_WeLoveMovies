if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

//Use CORS to allow all incoming requests
app.use(cors());

//Handlers
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

//Routers
const moviesRouter = require("./movies/movies.router");

//Use JSON format for data return
app.use(express.json());

//Direct request based on URL
app.use("/movies", moviesRouter);


// Not found handler
app.use(notFound);


// Error handler
app.use(errorHandler);

module.exports = app;
