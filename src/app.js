if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");


//Handlers



//Routers



app.use(express.json());
app.use(cors());

//Direct request based on URL



// Not found handler
app.use(notFound);


// Error handler
app.use(errorHandler);

module.exports = app;
