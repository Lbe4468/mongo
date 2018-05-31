// Bring in scrape and makeDate scripts
var scrape = require('../scripts/scrape')
var makeDate = require('../scripts/date')

// Bring in Headline and Note mongoose models
var Headline = require('../models/Headline')

module.exports = {
    // whenever fetch is run, perform function with callback passed through
    fetch: function(cb) {
        scrape(function(data) {
            var articles = data
                // loop through articles and run makeDate function and set saved to false
            for (var i = 0; i < articles.length; i++) {
                articles[i].date = makeDate()
                articles[i].saved = false
            }
            // Mongo function to insert articles into Headline collection
            Headline.collection.insertMany(articles, { ordered: false }, function(
                err,
                docs
            ) {
                cb(err, docs)
            })
        })
    },
    delete: function(query, cb) {
        Headline.remove(query, cb)
    },
    // get out all items in collection; find all Headlines and sort them by most recent and pass docs to callback function
    get: function(query, cb) {
        Headline.find(query)
            .sort({
                _id: -1
            })
            .exec(function(err, doc) {
                cb(doc)
            })
    },
    // update newly scraped articles with relevant id and info
    update: function(query, cb) {
        Headline.update({ _id: query._id }, {
                $set: query
            }, {},
            cb
        )
    }
}