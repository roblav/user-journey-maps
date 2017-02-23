
var casper = require('casper').create();
var overpaid = require('./overpaid-default.js');
//var overpaid = require('./overpaid-promise.js');
//var Promise = require('bluebird');

user1 = {
  "nino": "AA000003A",
  "name": "Bob Jones",
  "status": "overpaid-issued",
  "reasons": "Higher rate relief OP, Job Expenses OP",
  "refundStatus": "-available",
  "multi-rec": false
}

user2 = {
  "nino": "AM242413A",
  "name": "Bob Jones",
  "status": "overpaid-issued",
  "reasons": "Literally every single reason",
  "refundStatus": "-processing",
  "multi-rec": false
}

var url = "https://www-dev.tax.service.gov.uk/auth-login-stub/sign-in?continue=%2Ftax-you-paid%2Fstatus&accountType=individual"
//var url = "http://localhost:9949/gg/sign-in?continue=http%3A%2F%2Flocalhost%3A9416%2Ftax-you-paid%2Fstatus&accountType=individual"

//overpaid(casper, user1, url)

//userJourney.getImageCollection(dirPath).then(function(files){
//  console.log(files)
//});
// takeScreenshots

var test = overpaid(casper, user1, url);

console.log(test);
console.log('bob');

//overpaid(casper, user2, url, function(screenshots){});


