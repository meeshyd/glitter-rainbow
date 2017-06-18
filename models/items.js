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
    notes: [{
        author: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }]
});

var items = mongoose.model("items", itemsSchema);

// Export the model
module.exports = items;
