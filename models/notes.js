// Require mongoose
var mongoose = require("mongoose");

var noteSchema = new mongoose.Schema({
  author: {
  	type: String,
  	trim: true,
  	required: true
  },
  comment: {
    type: String,
    trim: true,
    required: true
  }
});

var notes = mongoose.model("notes", noteSchema);

module.exports = notes;
