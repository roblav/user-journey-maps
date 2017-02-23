var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

exports.getImageCollection = function (dirPath) {
  // Get a list of images in the app/casperjs/screenshots directory
  return fs.readdirAsync(dirPath)
    .then(function(fileData){
      return fileData
    })
    .catch(function(err){
      return err
    });
}
