
module.exports = function (scenarios, url, dirPath) {

  var screenshots =[];

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
      var imgName = scenario.status + scenario.paymentStatus + '-1.png';
      this.captureSelector(dirPath + imgName, 'main');
      screenshots.push(imgName);
      // Nav to the next page
      this.clickLabel('Tell us if you think that the amount you owe is wrong', 'a');
    });

    casper.then(function () {
      var imgName = scenario.status + scenario.paymentStatus + '-2.png';
      this.captureSelector(dirPath + imgName, 'main');
      screenshots.push(imgName);
    });

  });// end casper.each scenario

};

