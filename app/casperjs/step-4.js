var casper = require('casper').create();

casper.options.viewportSize = { width: 950, height: 950 };

var dirPath = 'app/casperjs/screenshots/'

var url = "https://www-dev.tax.service.gov.uk/auth-login-stub/sign-in?continue=%2Ftax-you-paid%2Fstatus&accountType=individual"

casper.options.viewportSize = { width: 950, height: 950 };

casper.start(url , function() {
  this.fill("form#inputForm", {
    'authorityId': 'aaa',
    'confidenceLevel':'200',
    'taxIdInfo[8].value': 'CA250613A'
  }, true);
});

casper.then(function() {
  this.captureSelector( dirPath + 'taxcalc-1.png', 'main');
});





casper.run();

