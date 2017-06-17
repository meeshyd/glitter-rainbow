/* Showing Mongoose's "Populated" Method (18.3.8)
 * INSTRUCTOR ONLY
 * =============================================== */

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var methodOverride = require("method-override");
// Requiring our Note and Article models
var Note = require("./models/notes.js");
var Article = require("./models/items.js");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

var PORT = process.env.PORT || 3000;
// Initialize Express
var app = express();

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// Make public a static dir
app.use(express.static(process.cwd() + "/public"));

// Database configuration with mongoose

if(process.env.NODE_ENV == 'production'){
	mongoose.connect("mongodb://heroku_1m9m2838:pivhosb7deajjih7rcgc6rdgbj@ds127892.mlab.com:27892/heroku_1m9m2838");
}
else{
	mongoose.connect("mongodb://localhost/rainbow");
};

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
