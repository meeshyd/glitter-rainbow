var items = require("../models/items.js");
var request = require("request");

module.exports = function(app) {

    app.get("/favorites/notes/:id", function(req, res) {

        items.findOne({

                "_id": req.params.id

            }).populate("note")
            .exec(function(error, doc) {
                if (error) {
                    console.log(error);
                } else {
                    res.json(doc);
                }
            });
    });

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
                if (err) return console.error(err);
                res.json(data.notes);
            }
        );
    });

    app.post('/favorites/notes/:id/delete', function(req, res) {

        items.findByIdAndUpdate(
            req.params.id, {
                $pull: {
                    notes: {
                        _id: req.body.id
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
