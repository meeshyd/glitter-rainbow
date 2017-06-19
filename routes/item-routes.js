// Requiring our model and required packages 
var items = require("../models/items.js");
var request = require("request");
var cheerio = require("cheerio");


module.exports = function(app) {
    // Simple redirect route
    app.get("/", function(req, res) {
        res.redirect("/items")
    });

    // Query items collection to find all items and sort by timestamp, render data in index.handlebars
    app.get("/items", function(req, res) {
        items.find({}).sort({ "created": -1 }).exec(function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                res.render("index", { items: doc });
            }
        });
    });

    // Query items collection to find all items, render data in favorites.handlebars
    // There is a condition found in favorites.handlebars to only display items where saved=true
    app.get("/favorites", function(req, res) {

        items.find({}).exec(function(error, doc) {

            if (error) {
                console.log(error);
            } else {
                res.render("favorites", { items: doc });
            }
        });
    });

    // this post route is used to save or unsave favorites
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

    // A GET request to scrape the Net-a-Porter website
    app.get("/scrape", function(req, res) {
        // Grab the body of the html with request
        // URL includes query parameter to retrieve rainbow items only
        request("https://www.net-a-porter.com/Shop/Search/rainbow?sortBy=newIn&keywords=rainbow&termUsed=rainbow", function(error, response, html) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(html);
            // Now, we grab every div with class product-image, and do the following:
            $("div.product-image").each(function(i, element) {

                // Save an empty result object
                var result = {};

                // Add the title, href, and image URL from each div
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
        // redirect to main page
        res.redirect(302, '/');
    });
};
