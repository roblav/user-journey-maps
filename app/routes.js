var nunjucks  = require('nunjucks');
var express = require('express');
var app = express();
var path = require('path');
var open = require('open');
var browserSync = require('browser-sync');
var config = require('./config.js');
var snapSVGutils = require('./snapSVG--utils.js');
var utils = require('../lib/utils.js');


var server = require('http').createServer(app);
var io = require('socket.io')(server);

// Middleware to serve static assets
app.use('/public', express.static('public'))

//console.log(__dirname)

//var port = process.env.PORT || (process.argv[2] || 3000);
//port = (typeof port === "number") ? port : 3000;

nunjucks.configure(path.join(__dirname, '/views/'), {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true
});

// TODO Move images to public directory

// var node1 = s.rect(50, 50, 50, 50, 5, 5).attr({class:"node"})

// { type: "text", x: 20, y: 20, val: "User Journey: Overpaid available" },

var script = [
  { type: "rect", name: "node1", x: 50, y: 50, width: 50, height: 50, rx: 5, ry: 5, attr: { class:"node"} },
  { type: "rect", name: "node1_1", x: 150, y: 50, width: 50, height: 50, rx: 5, ry: 5, attr: { class:"node node--help" } },
  { type: "path", name: "arrow1", val: "M100,75 l43,0 l-10,-10 l12,10 l-12,10", attr: { class:"arrow" } }
]

var grid = snapSVGutils.generateGrid(20, 20, 25, 25)
//console.log(grid)

// Add grid to script
script = grid.concat(script)

//console.log(script)

app.get('/', function(req, res) {
  res.render('index.html', {script: script});
});

app.get('/test', function(req, res) {
  res.render('user-maps.html', {script: script});
});


utils.findAvailablePort(app, function (port) {
  server.listen(port, function(err) {
    if (err) {
      console.log(err);
    } else {
      open('http://localhost:' + port);
    }
    //browserSync({
    //  proxy: 'localhost:' + (port),
    //  port: port,
    //  ui: false,
    //  files: ["app/views/*.html"]
    //});
  });
});


io.on('connection', function(socket) {
  //console.log('a user connected');
  socket.on('disconnect', function () {
    //console.log('user disconnected');
  });

  socket.on('usermaps--svg', function(data) {
    console.log(data)
  });

});
