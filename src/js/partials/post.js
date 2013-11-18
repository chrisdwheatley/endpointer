// post (POST /)
var fs = require('fs')
  , path = require('path')
  , mkdirp = require('mkdirp');

// post directory path and content passed in and create file
exports.file = function(req, res) {
  var input = req.body.path;
  var file = path.basename(input);
  var endpointPath = __dirname + '../../../../endpoints/' + input;
  var dir = path.dirname(endpointPath);
  var json = req.body.json;

  res.redirect('/');

  mkdirp(dir, function(err) {
    if (err) {
      console.log(err);
    } else {
      fs.writeFile(endpointPath, json, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('%s Saved to %s', file, dir);
        }
      });
    }
  });
};