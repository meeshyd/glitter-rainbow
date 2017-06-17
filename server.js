/* Showing Mongoose's "Populated" Method (18.3.8)
 * INSTRUCTOR ONLY
 * =============================================== */

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

var PORT = process.env.PORT || 3000;
// Initialize Express
var app = express();

// Set Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// Make public a static dir
app.use(express.static(process.cwd() + "/public"));

// Database configuration with mongoose

// mongoose.connect("mongodb://heroku_krkfnwrg:r420qka3bg4tqftel0h2spv2rs@ds131312.mlab.com:31312/heroku_krkfnwrg");
// username heroku_krkfnwrg
// pw r420qka3bg4tqftel0h2spv2rs
//host ds131312.mlab.com
//port 31312
//database heroku_krkfnwrg

mongoose.connect("mongodb://localhost/rainbow");

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//Routes 
require("./routes/display-routes.js")(app);
require("./routes/note-routes.js")(app);

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port 3000!");
});
