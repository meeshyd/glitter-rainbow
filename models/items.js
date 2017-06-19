// Require mongoose
var mongoose = require("mongoose");

// items schema store all the information pertaining to each item, including notes from users
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
    created: { 
        type: Date, 
        default: Date.now
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
