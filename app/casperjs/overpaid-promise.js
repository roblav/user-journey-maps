var Promise = require('bluebird');


module.exports = new Promise(function(resolve, reject) {

  function (casper, user, url) {

    var screenshots = [];

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
      var imgName = user.status + user.refundStatus + '-1.png';
      this.captureSelector(dirPath + imgName, 'main');
      screenshots.push(imgName);
      // Nav to the next page
      this.clickLabel('See why HMRC owe you', 'a');
    });

    casper.then(function () {
      var imgName = user.status + user.refundStatus + '-2.png';
      this.captureSelector(dirPath + imgName, 'main');
      screenshots.push(imgName);
    });

    // return a list of images

    return casper.run();

  }
});



