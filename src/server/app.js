/* Set Up MEAN 2 */
var express = require('express');
var path = require('path');
var helmet = require('helmet'); // TODO serve?

// Log requests to the console (Express 4)
var morgan = require('morgan'); // logger
// Pull information from HTML POST (express 4)
var bodyParser = require('body-parser');
// Load Mongoose for MongoDB interactions
var mongoose = require('mongoose');

/* Set Up Auth with Passport e JWT */
var passport = require('passport');
var jwt      = require('jwt-simple');
var cookieParser = require('cookie-parser');

var app = express();

//app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/../../dist'));
app.use('/', express.static(__dirname + '/../public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Log every request to the console
app.use(morgan('dev'));

// database Set Up
var configDB = require('./config/database.js');
var port = configDB.PORT || 10000;

mongoose.connect(configDB.url, function (error) 
{
    if (error) 
    {
        console.log(error);
    }
});

var db = mongoose.connection;
mongoose.Promise = global.Promise; // TODO ??? a che serve?

console.log('  ---  ');
console.log('Indirizzo db: ' +configDB.url);

/*
app.use(helmet());
*/

// Models
var Cat = require('./schemas/cat.model.js');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');

  // APIs
  // select all
  app.get('/cats', function(req, res) {
    Cat.find({}, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });

  // count all
  app.get('/cats/count', function(req, res) {
    Cat.count(function(err, count) {
      if(err) return console.error(err);
      res.json(count);
    });
  });

  // create
  app.post('/cat', function(req, res) {
    var obj = new Cat(req.body);
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  // find by id
  app.get('/cat/:id', function(req, res) {
    Cat.findOne({_id: req.params.id}, function(err, obj) {
      if(err) return console.error(err);
      res.json(obj);
    })
  });

  // update by id
  app.put('/cat/:id', function(req, res) {
    Cat.findOneAndUpdate({_id: req.params.id}, req.body, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    })
  });

  // delete by id
  app.delete('/cat/:id', function(req, res) {
    Cat.findOneAndRemove({_id: req.params.id}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  });


  // all other routes are handled by Angular
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/../../dist/index.html'));
  });

  app.listen(port, function() {
    console.log('Angular 2 Full Stack listening on port '+port);
    console.log('  ---  ');
  });
});

/*
app.listen(port, function () 
{
  console.log('Angular 2 Full Stack listening on port ' + port);
  console.log('  ---  ');
}); */

module.exports = app;