var nunjucks  = require('nunjucks');
var express = require('express');
var app = express();
var path = require('path');
var open = require('open');
var browserSync = require('browser-sync');
var config = require('./config.js')
var utils = require('../lib/utils.js')

//var port = process.env.PORT || (process.argv[2] || 3000);
//port = (typeof port === "number") ? port : 3000;

nunjucks.configure(path.join(__dirname, '/views/'), {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true
});

app.get('/', function(req, res) {
  res.render('index.html', {title : 'My First Nunjucks Page'});
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


