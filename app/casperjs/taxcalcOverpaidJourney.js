
module.exports = function (scenarios, url, dirPath) {

  var screenshots =[];

  casper.start();

  casper.each(scenarios, function (casper, scenario) {

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
      // Nav to the next page
      this.clickLabel('See why HMRC owe you', 'a');
    });

    casper.then(function () {
      var imgName = scenario.status + scenario.refundStatus + '-2.png';
      this.captureSelector(dirPath + imgName, 'main');
      screenshots.push(imgName);
    });

  });// end casper.each scenario

};

