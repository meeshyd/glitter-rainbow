var items = require("../models/items.js");
var notes = require("../models/notes.js");
var request = require("request");

module.exports = function(app){

  app.get("/favorites/notes/:id", function(req, res) {

    items.findOne({

      "_id": req.params.id

    }).populate("note")
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

  app.post("/favorites/notes/:id", function(req, res) {
    var newNote = new notes(req.body);
    newNote.save(function(error, doc) {
      if (err) {
        console.log(err);
      }
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
          res.json(doc);
        }
      });
    }
    });
  });

};