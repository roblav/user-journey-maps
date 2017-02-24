var nunjucks  = require('nunjucks');
var express = require('express');
var app = express();
var path = require('path');
var open = require('open');
var browserSync = require('browser-sync');
var config = require('./config.js');
var utils = require('../lib/utils.js');

// Middleware to serve static assets
app.use('/public', express.static('public'))

//console.log(__dirname)

//var webpack = require('webpack');
var userJourney = require('./userJourney.js');

//var compiler = webpack(config);

//var port = process.env.PORT || (process.argv[2] || 3000);
//port = (typeof port === "number") ? port : 3000;

nunjucks.configure(path.join(__dirname, '/views/'), {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true
});

// TODO Move images to public directory

// Get a collection of images
//var dirPath = path.join( __dirname, 'casperjs/screenshots' )
var dirPath = 'public/images'

var imgFiles = [
  'overpaid-issued-available-1.png',
  'overpaid-issued-available-2.png',
  'overpaid-issued-processing-1.png',
  'underpaid-issued-coded-out-1.png',
  'underpaid-issued-coded-out-2.png'
  ]


userJourney.getImageCollection(dirPath).then(function(files){
  console.log(files)
});

app.get('/', function(req, res) {
  res.render('impress.html', {imgFiles: imgFiles});
});

utils.findAvailablePort(app, function (port) {
  app.listen(port, function(err) {
    if (err) {
      console.log(err);
    } else {
      open('http://localhost:' + port);
    }
    browserSync({
      proxy: 'localhost:' + (port),
      port: port,
      ui: false,
      files: ["app/views/*.html"]
    });
  });
});


