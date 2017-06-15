// Require mongoose
var mongoose = require("mongoose");

var noteSchema = new mongoose.Schema({
  title: {
    type: String
  },
  body: {
    type: String
  }
});

var note = mongoose.model("note", noteSchema);

module.exports = note;
