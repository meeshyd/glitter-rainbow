var items = require("../models/items.js");
var request = require("request");
var cheerio = require("cheerio");

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.redirect("/items")
    });

    app.get("/items", function(req, res) {
        items.find({}).sort({ "_id": -1 }).exec(function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                res.render("index", { items: doc });
            }
        });
    });

    app.get("/favorites", function(req, res) {

        items.find({}).sort({ "_id": -1 }).exec(function(error, doc) {

            if (error) {
                console.log(error);
            } else {
                res.render("favorites", { items: doc });
            }
        });
    });

    app.post("/favorites/:id", function(req, res) {

        items.findOneAndUpdate({
            "_id": req.params.id
        }, {
            $set: {
                "saved": req.body.saved
            }

        }, { new: true }).exec(function(err, doc) {

            if (err) {
                console.log(err);
            } else {
                res.redirect("/favorites");
            };
        });
    });

    // A GET request to scrape the echojs website
    app.get("/scrape", function(req, res) {
        // First, we grab the body of the html with request
        request("https://www.net-a-porter.com/Shop/Search/rainbow?sortBy=newIn&keywords=rainbow&termUsed=rainbow", function(error, response, html) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(html);
            // Now, we grab every h2 within an article tag, and do the following:
            $("div.product-image").each(function(i, element) {

                // Save an empty result object
                var result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this).find("a").find("img").attr("alt");;
                result.link = "https://www.net-a-porter.com/us/en" + $(this).find("a").attr("href");
                result.image = "https:" + $(this).find("a").find("img").attr("data-image-product");

                // Using our items model, create a new entry
                // This effectively passes the result object to the entry (and the title and link)
                var entry = new items(result);

                // Now, save that entry to the db
                entry.save(function(err, doc) {
                    // Log any errors
                    if (err) {
                        console.log(err);
                    }
                    // Or log the doc
                    else {
                        console.log(doc);
                    }
                });
            });
        });

        res.send("Scrape Complete");
    });
};
