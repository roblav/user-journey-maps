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

var script = []

var script1 = [
  { type: "rect", name: "node1", x: 50, y: 50, width: 50, height: 50, rx: 5, ry: 5, attr: { class:"node"} },
  { type: "rect", name: "node1_1", x: 150, y: 50, width: 50, height: 50, rx: 5, ry: 5, attr: { class:"node node--help" } },
  { type: "path", name: "arrow1", val: "M100,75 l43,0 l-10,-10 l12,10 l-12,10", attr: { class:"arrow" } }
]

var grid = snapSVGutils.generateGrid(20, 20, 25, 25)
//console.log(grid)

// Add grid to script
script = grid.concat(script)

var icons = [
  { type: "button", name: "pencil", title: "Edit Node", iconTransform: 't10,7', transform: 't0,150', path: ["M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"]
  },
  { type: "button", name: "arrows", title: "Create Arrows", iconTransform: 't10,10', transform: 't50,150', path: [
      "M32 0h-13l5 5-6 6 3 3 6-6 5 5z",
      "M32 32v-13l-5 5-6-6-3 3 6 6-5 5z",
      "M0 32h13l-5-5 6-6-3-3-6 6-5-5z",
      "M0 0v13l5-5 6 6 3-3-6-6 5-5z"
    ]
  },
  { type: "button", name: "delete", title: "Delete Node", iconTransform: 't10,7', transform: 't0,200', path: [
      "M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z",
      "M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"
    ],
    iconcallback: "el.remove()"
  },
    { type: "button", name: "clear", title: "Clear All", iconTransform: 't10,7 s1.2', transform: 't50,200', path: [
      "M23.609 16.5c0 0.031 0 0.078-0.016 0.109-1.328 5.531-5.891 9.391-11.656 9.391-3.047 0-6-1.203-8.219-3.313l-2.016 2.016c-0.187 0.187-0.438 0.297-0.703 0.297-0.547 0-1-0.453-1-1v-7c0-0.547 0.453-1 1-1h7c0.547 0 1 0.453 1 1 0 0.266-0.109 0.516-0.297 0.703l-2.141 2.141c1.469 1.375 3.422 2.156 5.437 2.156 2.781 0 5.359-1.437 6.813-3.813 0.375-0.609 0.562-1.203 0.828-1.828 0.078-0.219 0.234-0.359 0.469-0.359h3c0.281 0 0.5 0.234 0.5 0.5zM24 4v7c0 0.547-0.453 1-1 1h-7c-0.547 0-1-0.453-1-1 0-0.266 0.109-0.516 0.297-0.703l2.156-2.156c-1.484-1.375-3.437-2.141-5.453-2.141-2.781 0-5.359 1.437-6.813 3.813-0.375 0.609-0.562 1.203-0.828 1.828-0.078 0.219-0.234 0.359-0.469 0.359h-3.109c-0.281 0-0.5-0.234-0.5-0.5v-0.109c1.344-5.547 5.953-9.391 11.719-9.391 3.063 0 6.047 1.219 8.266 3.313l2.031-2.016c0.187-0.187 0.438-0.297 0.703-0.297 0.547 0 1 0.453 1 1z"
    ],
      mousedown: "var set = paper.selectAll(\".g-node, .arrow\");set.remove()"
    }
]

//console.log(script)

app.get('/', function(req, res) {
  res.render('index.html', {script: script, icons: icons});
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
