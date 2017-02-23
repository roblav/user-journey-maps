
module.exports = function(casper, user, url) {

  casper.options.viewportSize = {width: 950, height: 950};

  var dirPath = 'app/casperjs/screenshots/'

  function ggStartPage(that, nino) {
    that.fill("form#inputForm", {
      'authorityId': 'aaa',
      'confidenceLevel': '200',
      'taxIdInfo[8].value': nino
    }, true);
  }

  casper.start(url, function () {
    ggStartPage(this, user.nino)
  });

  casper.then(function () {
    this.captureSelector(dirPath + user.status + user.refundStatus + '-1.png', 'main');
    // Nav to the next page
    this.clickLabel('See why HMRC owe you', 'a');
  });

  casper.then(function () {
    this.captureSelector(dirPath + user.status + user.refundStatus + '-2.png', 'main');
  });


  casper.run();

}

