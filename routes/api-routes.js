var items = require("../models/items.js");
var notes = require("../models/notes.js");

module.exports = function(app){
  app.get("/", function(req,res){
    res.redirect("/items")
  });
  // This will get the articles we scraped from the mongoDB
  app.get("/items", function(req, res) {
    // Grab every doc in the Articles array
    items.find({}, function(error, doc) {
      // Log any errors
      if (error) {
        console.log(error);
      }
      // Or send the doc to the browser as a json object
      else {
        res.render("index", {items:doc});
      }
    });
  });

  // Grab an article by it's ObjectId
  app.get("/items/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    items.findOne({ "_id": req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    // now, execute our query
    .exec(function(error, doc) {
      // Log any errors
      if (error) {
        console.log(error);
      }
      // Otherwise, send the doc to the browser as a json object
      else {
        res.json(doc);
      }
    });
  });


  // Create a new note or replace an existing note
  app.post("/items/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    var newNote = new Note(req.body);

    // And save the new note the db
    newNote.save(function(error, doc) {
      // Log any errors
      if (error) {
        console.log(error);
      }
      // Otherwise
      else {
        // Use the article id to find and update it's note
        items.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
        // Execute the above query
        .exec(function(err, doc) {
          // Log any errors
          if (err) {
            console.log(err);
          }
          else {
            // Or send the document to the browser
            res.send(doc);
          }
        });
      }
    });
  });
};