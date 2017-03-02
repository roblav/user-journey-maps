
var taxcalcOverpaidJourney = require('./taxcalcOverpaidJourney');
var taxcalcUnderpaidJourney = require('./taxcalcUnderpaidJourney');
var taxcalcHelpJourney = require('./taxcalcHelpJourney');

var casper = require('casper').create({
  logLevel: true ? 'debug' : 'info',
  verbose: true
});

var overpaidUsers = require("./overpaidUsers.json");
var underpaidUsers = require("./underpaidUsers.json");
var vplUser = require("./vplUser.json");

var url = "https://www-dev.tax.service.gov.uk/auth-login-stub/sign-in?continue=%2Ftax-you-paid%2Fstatus&accountType=individual"
//var url = "http://localhost:9949/gg/sign-in?continue=http%3A%2F%2Flocalhost%3A9416%2Ftax-you-paid%2Fstatus&accountType=individual"

casper.options.viewportSize = {width: 950, height: 950};
var dirPath = 'app/casperjs/screenshots/';

casper.start();

taxcalcOverpaidJourney(overpaidUsers.scenarios, url, dirPath);
//taxcalcUnderpaidJourney(underpaidUsers.scenarios, url, dirPath);
//taxcalcHelpJourney(vplUser.scenarios, url, dirPath);

casper.run(function () {
  console.log('\n======================\nechoFiles has completed \n=======================\n');
  this.exit();
});




