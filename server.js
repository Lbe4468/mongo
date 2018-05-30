// Require dependencies
var express = require('express');
var mongoose = require('mongoose');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
// Set up port to be Heroku port or port 3000
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Set up Express Router
var router = express.Router();

// Designate public folder as static directory
app.use(express.static(__dirname + '/public'));

// Connect Handlebars to Express app
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));

// Set every request to go through router middleware
app.use(router);

// If deployed, use the deployed database. Otherwise use local DB
var db = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

// Connect Mongoose to our DB
mongoose.connect(db, function (error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Mongoose connected successfully!');
    }
});
// Listen on the port
app.listen(PORT, function () {
    console.log('Listening on port: ' + PORT);
});