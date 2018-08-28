var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

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


// require("./controllers/api-Routes")(app);
require("./controllers/html-Routes")(app);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/Articles_db");

db.Article.create({ Headline: "Campus Library" })
  .then(function(testArticle) {
    // If saved successfully, print the new Library document to the console
    console.log(testArticle);
  })
  .catch(function(err) {
    // If an error occurs, print it to the console
    console.log(err.message);
  });

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });