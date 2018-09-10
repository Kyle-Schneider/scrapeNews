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

    notes: [
        {
            type: Schema.Types.ObjectId,

            ref: "Note"
        }
    ]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;