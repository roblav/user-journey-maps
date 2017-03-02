
module.exports = function (scenarios, url, dirPath) {

  var screenshots =[];

  casper.each(scenarios, function (casper, scenario) {

    var reasonLink

    switch(scenario.refundStatus) {
      case '-available':
      case '-processing':
      case '-not-available':
        reasonLink = 'See why HMRC owe you'
        break
      case '-cheque-sent':
      case '-claimed':
        reasonLink = 'See why HMRC owed you'
        break
    }

    //console.log('LOG> CASPER IS RUNNING - ' + scenario.name);

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
    });

    casper.then(function () {
      // Nav to the next page
      this.clickLabel(reasonLink, 'a');
    });

    casper.then(function () {
      var imgName = scenario.status + scenario.refundStatus + '-2.png';
      this.captureSelector(dirPath + imgName, 'main');
      screenshots.push(imgName);
    });

  });// end casper.each scenario

};

