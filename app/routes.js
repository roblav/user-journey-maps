var nunjucks  = require('nunjucks');
var express = require('express');
var app = express();
var path = require('path');
var open = require('open');

var port = 3000;

nunjucks.configure(path.join(__dirname, '/views/'), {
  autoescape: true,
  express   : app
});

app.get('/', function(req, res) {
  res.render('index.html', {title : 'My First Nunjucks Page'});
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
