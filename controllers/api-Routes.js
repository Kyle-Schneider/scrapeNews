var db = require("../models/index.js");

var axios = require("axios");
var cheerio = require("cheerio");


module.exports = function (app) {

    // app.post("/api/test", function (req, res) {
    //     db.Article.create({ Headline: "Campus Gymnasium" })

    //     .then(function (testArticle) {
    //         res.json(testArticle);
    //       // If saved successfully, print the new Library document to the console
    //       console.log(testArticle);
    //     })
    //     .catch(function (err) {
    //       // If an error occurs, print it to the console
    //       console.log(err.message);
    //     });
    // });


    app.get("/api/scrape", function (req, res) {
        axios.get("http://www.echojs.com/").then(function (response) {
            var $ = cheerio.load(response.data);

            $("article h2").each(function (i, element) {
                var result = {};

                result.Headline = $(this)
                    .children("a")
                    .text();
                result.URL = $(this)
                    .children("a")
                    .attr("href");


                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        return res.json(err);
                    });
            });

            res.send("Scrape Complete");

        });
    });

    app.get("/articles", function (req, res) {
        db.Article.find({})
            .then(function (dbArticle) {
                res.json(dbArticle);
                console.log(dbArticle)
            })
            .catch(function (err) {
                res.json(err);
            });
    });

// Route for saving a new Note to the db and associating it with a User
app.post("/submit", function(req, res) {
    // Create a new Note in the db
    db.Note.create(req.body)
      .then(function(dbNote) {
        // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({}, { $push: { notes: dbNote._id } }, { new: true });
      })
      .then(function(dbUser) {
        // If the User was updated successfully, send it back to the client
        res.json(dbUser);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });
}