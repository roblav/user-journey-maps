
var casper = require('casper').create({
  logLevel: false ? 'debug' : 'info',
  verbose: false
});

//var overpaid = require('./overpaid-default1.js');
//var overpaid = require('./overpaid-promise.js');
//var Promise = require('bluebird');

var scenarios =  [
  {
    "nino": "AA000003A",
    "name": "Bob Jones",
    "status": "overpaid-issued",
    "reasons": "Higher rate relief OP, Job Expenses OP",
    "refundStatus": "-available",
    "multi-rec": false
  },
  {
    "nino": "AM242413A",
    "name": "Todd",
    "status": "overpaid-issued",
    "reasons": "Literally every single reason",
    "refundStatus": "-processing",
    "multi-rec": false
  }
];



var url = "https://www-dev.tax.service.gov.uk/auth-login-stub/sign-in?continue=%2Ftax-you-paid%2Fstatus&accountType=individual"
//var url = "http://localhost:9949/gg/sign-in?continue=http%3A%2F%2Flocalhost%3A9416%2Ftax-you-paid%2Fstatus&accountType=individual"

function capturePageSelectors (scenarios) {

  var screenshots =[];

  casper.options.viewportSize = {width: 950, height: 950};
  casper.start();

  var dirPath = 'app/casperjs/screenshots/';

  casper.each(scenarios, function (casper, scenario) {

    console.log('LOG> CASPER IS RUNNING - ' + scenario.name);

    casper.thenOpen(url, function () {
      this.fill("form#inputForm", {
        'authorityId': 'aaa',
        'confidenceLevel': '200',
        'taxIdInfo[8].value': scenario.nino
      }, true);
    });

    casper.then(function () {
      var imgName = scenario.status + scenario.refundStatus + '-1.png';
      this.captureSelector(dirPath + imgName, 'main');
      screenshots.push(imgName);
      // Nav to the next page
      this.clickLabel('See why HMRC owe you', 'a');
    });

    casper.then(function () {
      var imgName = scenario.status + scenario.refundStatus + '-2.png';
      this.captureSelector(dirPath + imgName, 'main');
      screenshots.push(imgName);
    });

  });// end casper.each scenario
}

capturePageSelectors(scenarios);

casper.run(function () {
  console.log('\n======================\nechoFiles has completed \n=======================\n');
  this.exit();
});




