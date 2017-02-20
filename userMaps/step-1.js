//var page = require('webpage').create();
//page.open('https://www.npmjs.com/package/phantomjs-prebuilt', function(status) {
//  console.log("Status: " + status);
//  if(status === "success") {
//    page.render('example.png');
//  }
//  phantom.exit();
//});

var casper = require('casper').create({
  viewportSize: {width: 950, height: 950}
});

casper.start('http://www.google.com/', function() {
  this.captureSelector('userMaps/screenshots/pp.png', 'body');
});

casper.run();
