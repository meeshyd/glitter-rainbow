var items = require("../models/items.js");
var request = require("request");
var cheerio = require("cheerio");

module.exports = function(app){
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

	      // Using our Article model, create a new entry
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
	  // Tell the browser that we finished scraping the text
	  res.redirect("/items");
	});
};