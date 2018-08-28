var mongoose = require ("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

    Headline: {
        type: String,
        unique: true
    },

    Summary: {
        type: String,

    },

    URL: {
        type: String
    },
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;