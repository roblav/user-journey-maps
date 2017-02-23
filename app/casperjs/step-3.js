var casper = require('casper').create();

casper.options.viewportSize = { width: 950, height: 950 };

var dirPath = 'app/casperjs/screenshots/'

casper.options.viewportSize = { width: 950, height: 950 };

casper.start('http://www.google.com/', function() {
  this.captureSelector( dirPath + '1.png', 'body');
  console.log("Screenshot taken");
});

casper.run();

