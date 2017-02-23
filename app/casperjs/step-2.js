//var casper = require('casper').create();

//casper.options.viewportSize = { width: 950, height: 950 };
//var path = require('path');
//var fs = require('fs');


// Create file

casper.test.begin('Testing Google Search and Results pages', 1, function(test) {

  //var dirPath = path.join( __dirname, 'casperjs/screenshots' )

  //console.log(dirPath)

  casper.start('https://www.google.co.uk/', function() {
    // Wait for the page to be loaded
    this.waitForSelector('form[action="/search"]');
  });

  casper.then(function() {
    casper.capture('userMaps/screenshots/google-1.png');
    // search for 'casperjs' from google form
    this.fill('form[action="/search"]', { q: 'javascript' }, true);
    this.waitForSelector('form[action="/search"]');
    casper.capture('userMaps/screenshots/google-2.png');
    // Add file name to json file
  });

  casper.then(function() {
    //console.log("Title: " + this.getTitle());
    casper.capture('userMaps/screenshots/google-3.png');
    test.assertTitle('javascript - Google Search');
  });

  casper.run(function() {
    test.done();
  });

});
