//BrentAureli.com
//Author: Brent Aureli
//NodeJS Server

//Initialize our Express Web framework.
var express = require('express');
var app = express();

//socket IO stuff
var http = require('http').Server(app);
var io = require('socket.io')(http);

//native NodeJS module for resolving paths
var path = require('path');

//get our port # from c9's enviromental variable: PORT
var port = process.env.PORT;

var bodyParser = require('body-parser');
app.use(bodyParser.json())
var methodOverride = require('method-override');
app.use(methodOverride());

//setup, configure, and connect to MongoDB
var mongoose = require('mongoose');
var configDB = require('./server/config/database.js');
mongoose.connect(configDB.url);

//Set our view engine to EJS, and set the directory our views will be stored in
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'client', 'views'));

//serve static files from client folder.
//ex: libs/bootstrap/bootstrap.css in our html actually points to client/libs/bootstrap/bootstrap.css
app.use(express.static(path.resolve(__dirname, 'client')));


//set our first route
app.get('/', function(req, res) {
  res.render('index.ejs');
});

var api = express.Router();
require('./server/routes/api')(api);
app.use('/api', api);

app.get('/*', function(req, res) {
  res.render('index.ejs');
});

//make our app listen for incoming requests on the port assigned above
http.listen(port, function() {
  console.log('SERVER RUNNING... PORT: ' + port);
})