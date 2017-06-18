// Require our model and request package
var items = require("../models/items.js");
var request = require("request");

module.exports = function(app) {
    // route to retrieve all the notes for item by item id
    app.get("/favorites/notes/:id", function(req, res) {

        items.findOne({

                "_id": req.params.id

            })
            .exec(function(error, doc) {
                if (error) {
                    console.log(error);
                } else {
                    res.json(doc);
                }
            });
    });
    // post route to push new notes to the notes array in the items model
    app.post('/favorites/notes/:id', function(req, res) {

        items.findByIdAndUpdate(
            req.params.id, {
                $push: {
                    notes: {
                        author: req.body.author,
                        comment: req.body.comment
                    }
                }
            }, { upsert: true, new: true },
            function(err, data) {
                if (err) {
                  return console.error(err);
                } else {

                  res.sendStatus(200);
                }
                // res.json(data.notes);
            }
        );
    });
    // post route to remove a specific note from the notes array in the items model
    app.post('/favorites/notes/delete/:id/', function(req, res) {
      console.log("response ",res)
        items.findByIdAndUpdate(
            req.params.id, {
                $pull: {
                    notes: {
                        _id: req.body._id
                    }
                }
            }, { new: true },
            function(err, data) {
                if (err) return console.error(err);
                res.json(data.notes);
            }
        );
    });

};
