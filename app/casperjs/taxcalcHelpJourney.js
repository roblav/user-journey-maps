
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
      this.clickLabel('Get help or more information', 'a');
    });

    casper.then(function () {
      var imgName = scenario.status + scenario.paymentStatus + '-1.png';
      this.captureSelector(dirPath + imgName, 'main');
      screenshots.push(imgName);
    });

    casper.then(function () {
      // Nav to the next page
      this.fillSelectors('form#helpOption-form', {
        'input[name="helpOption"]':    'adjusting-code'
      }, true);
    });

    casper.then(function () {
      var imgName = scenario.status + scenario.paymentStatus + '-2.png';
      this.captureSelector(dirPath + imgName, 'main');
      screenshots.push(imgName);
      this.clickLabel('Back', 'a');
    });

    casper.then(function () {
      // Nav to the next page
      this.fill("form#helpOption-form", {
        'helpOption': 'hardship'
      }, true);
    });

    casper.then(function () {
      var imgName = scenario.status + scenario.paymentStatus + '-3.png';
      this.captureSelector(dirPath + imgName, 'main');
      screenshots.push(imgName);
      this.clickLabel('Back', 'a');
    });

    casper.then(function () {
      // Nav to the next page
      this.fill("form#helpOption-form", {
        'helpOption': 'webchat-advise'
      }, true);
    });

    casper.then(function () {
      var imgName = scenario.status + scenario.paymentStatus + '-4.png';
      this.captureSelector(dirPath + imgName, 'main');
      screenshots.push(imgName);
    });


  });// end casper.each scenario

};

