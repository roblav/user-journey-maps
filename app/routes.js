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
  'underpaid-issued-outstanding-4.png',
  'underpaid-issued-outstanding-3.png',
  'underpaid-issued-outstanding-2.png',
  'underpaid-issued-outstanding-1.png',
  'underpaid-issued-coded-out-2.png',
  'underpaid-issued-coded-out-1.png',
  'overpaid-issued-processing-2.png',
  'overpaid-issued-processing-1.png',
  'overpaid-issued-not-available-2.png',
  'overpaid-issued-not-available-1.png',
  'overpaid-issued-claimed-2.png',
  'overpaid-issued-claimed-1.png',
  'overpaid-issued-cheque-sent-2.png',
  'overpaid-issued-cheque-sent-1.png',
  'overpaid-issued-available-2.png',
  'overpaid-issued-available-1.png'
  ]


userJourney.getImageCollection(dirPath).then(function(files){
  //console.log(files)
});

app.get('/', function(req, res) {
  res.render('index.html', {imgFiles: imgFiles});
});

// var node1 = s.rect(50, 50, 50, 50, 5, 5).attr({class:"node"})

var script = [
  { type: "text", x: 20, y: 20, val: "User Journey: Overpaid available" },
  { type: "rect", name: "node1", x: 50, y: 50, width: 50, height: 50, rx: 5, ry: 5, attr: { class:"node"} },
  { type: "rect", name: "node1_1", x: 150, y: 50, width: 50, height: 50, rx: 5, ry: 5, attr: { class:"node node--help" } },
  { type: "path", name: "arrow1", val: "M100,75 l43,0 l-10,-10 l12,10 l-12,10", attr: { class:"arrow" } }
]

var grid = snapSVGutils.generateGrid(10, 10, 50, 50)
//console.log(grid)

// Add grid to script
script = script.concat(grid)

//console.log(script)

app.get('/test', function(req, res) {
  res.render('test.html', {script: script});
});

//app.get('/', function(req, res) {
//  res.render('impress.html', {imgFiles: imgFiles});
//});

app.get('/impress-test', function(req, res) {
  res.render('impress-test.html', {imgFiles: imgFiles});
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
  })

  // Get user input for User Maps
  // now return the correct manulUpdateMsg message
  socket.on('checkboxOptions--usermaps', function(data) {
    var imgSet = {}
    //console.log(data)
    // Use data to get set of images to pass back
    // List out all of the values
    for(var str in data) {
      //console.log(str)
      containsSubstring (imgFiles.reverse(), str)
      //use prop value to find match in array
    }
    //compare substring against each array item
    function containsSubstring (array, str) {
      var strRegExp = new RegExp(str);
      //console.log(str)
      //for loop
      for (var i=0; i < array.length; i++) {
        //console.log(array[i] + " compare with " + str);

        if (strRegExp.test(array[i])) {
          //console.log(str + " matches - " + array[i]);
          //Add to object
          imgSet["img"+i] = array[i]
        } else {
          //console.log("Not a match");
        }
      }
    }
    //console.log(imgSet)
    // Pass the data object back to the client
    io.emit('checkboxOptions--usermaps-PUB', imgSet);
  });
});
