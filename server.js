var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");


var PORT = 3000;

var MONGOBD_URI = process.env.MONGODB_URI

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));


require("./controllers/api-Routes")(app);
require("./controllers/html-Routes")(app);

// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/Articles_db");

mongoose.Promise = Promise
mongoose.connect(MONGOBD_URI);


app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});