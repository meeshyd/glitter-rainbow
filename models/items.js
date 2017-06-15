// Require mongoose
var mongoose = require("mongoose");


var itemsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    unique: true,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  saved: {
    type: Boolean,
    default: false,
    required: true
  },
  note: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Note"
  }
});

var items = mongoose.model("items", itemsSchema);

// Export the model
module.exports = items;
