
user = {
  "nino": "AA000003A",
  "name": "Bob Jones",
  "status": "overpaid-issued",
  "reasons": "Higher rate relief OP, Job Expenses OP",
  "refundStatus": "-available",
  "multi-rec": false
}

var casper = require('casper').create();

casper.options.viewportSize = { width: 950, height: 950 };

var dirPath = 'app/casperjs/screenshots/'

//var url = "https://www-dev.tax.service.gov.uk/auth-login-stub/sign-in?continue=%2Ftax-you-paid%2Fstatus&accountType=individual"
var url = "http://localhost:9949/gg/sign-in?continue=http%3A%2F%2Flocalhost%3A9416%2Ftax-you-paid%2Fstatus&accountType=individual"

function ggStartPage(that, nino){
  that.fill("form#inputForm", {
    'authorityId': 'aaa',
    'confidenceLevel':'200',
    'taxIdInfo[8].value': nino
  }, true);
}

casper.options.viewportSize = { width: 950, height: 950 };

casper.start(url , function() {
  ggStartPage(this, user.nino)
});

casper.then(function() {
  this.captureSelector( dirPath + user.status + user.refundStatus + '-1.png', 'main');
  // Nav to the next page
  this.clickLabel('See why HMRC owe you', 'a');
});

casper.then(function() {
  this.captureSelector( dirPath + user.status + user.refundStatus + '-2.png', 'main');
});


casper.run();

