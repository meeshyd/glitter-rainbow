// var items = require("../models/items.js");
// var notes = require("../models/notes.js");
// var request = require("request");

// module.exports = function(app){

//   app.get("/favorites/notes/:id", function(req, res) {

//     items.findOne({ "_id": req.params.id })
//     .populate("note")
//     .exec(function(error, doc) {
//       if (error) {
//         console.log(error);
//       }
//       else {
//         res.json(doc);
//       }
//     });
//   });

//   app.post("/favorites/notes/:id", function(req, res) {
//     var newNote = new notes(req.body);
//     newNote.save(function(error, doc) {
//       if (err) {
//         console.log(err);
//       }
//       else {
//         res.send(doc);
//       }
//     });
//   });

// };