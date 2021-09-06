if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors"); //adding cors
const app = express();

//createing routers
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

//errors handlers
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

//routes and setups
app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
// app.use("/theaters", theatersRouter);
// app.use("/reviews", reviewsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
