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

var note = mongoose.model("note", noteSchema);

module.exports = note;
