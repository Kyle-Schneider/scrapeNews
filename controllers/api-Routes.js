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
 
    db.Note.create(req.body)
      .then(function(dbNote) {
        
        return db.Article.findOneAndUpdate({}, { $push: { notes: dbNote._id } }, { new: true });
      })
      .then(function(dbUser) {
       
        res.json(dbUser);
      })
      .catch(function(err) {
        
        res.json(err);
      });
  });

app.get("/notes", function(req,res){
    db.Note.find({})
    .then(function(data){
        res.json(data);
    })
})

  app.get("/populate", function(req, res) {
    // Find all users
    db.Article.find({})
      // Specify that we want to populate the retrieved users with any associated notes
      .populate("notes")
      .then(function(dbUser) {
        // If able to successfully find and associate all Users and Notes, send them back to the client
        res.json(dbUser);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });

}