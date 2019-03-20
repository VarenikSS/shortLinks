var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var Link = require('./models/Link.js');
var link = require('./routes/link');
var app = express();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/mean-angular5', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist/mean-angular5')));
app.use('/', express.static(path.join(__dirname, 'dist/mean-angular5')));
app.use('/link', link);

app.get(/^\/[a-z0-9]{9}\/?$/, (req, res) => {
  let url = req.get('host') + req.url;
  url = url.slice(0,-1);
  Link.find({ generated_link: { $eq: url }}, function (err, data) {
    let currentObj = data[0];
    if(currentObj.url.indexOf('http')=== -1){
      res.redirect('https://' + currentObj.url);
    }else {
      res.redirect(currentObj.url);
    }
    
  });
})

app.use('*', express.static(path.join(__dirname, 'dist/mean-angular5')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;