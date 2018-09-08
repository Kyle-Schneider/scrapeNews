var db = require ("../models/index.js");

var axios = require("axios");
var cheerio = require("cheerio");


module.exports = function(app) {

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
      
        $("article h2").each(function(i, element){
          var result = {};
      
          result.Headline = $(this)
          .children("a")
        .text();
      result.URL = $(this)
      .children("a")
      .attr("href");


      db.Article.create(result)
      .then(function(dbArticle){
        console.log(dbArticle);
      })
      .catch(function(err) {
        return res.json(err);
      });
        });

        res.send("Scrape Complete");
      
        });
      });
      
      app.get("/articles", function(req, res) {
        db.Article.find({})
        .then(function(dbArticle) {
          res.json(dbArticle);
          console.log(dbArticle)
        })
        .catch(function(err){
          res.json(err);
        });
      });


}