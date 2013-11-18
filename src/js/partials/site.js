// site (GET /)
var readdirp = require('readdirp');

// recursively list json files under endpoints directory 
exports.index = function(req, res) {
  readdirp({
    root: __dirname + '../../../../endpoints',
    fileFilter: '*.json'
  }, function(err, files) {
    if (err) throw err;
    res.render('index', {
      files: files.files,
      title: 'Endpointer',
      subtitle: 'Rapidly serve JSON endpoints to your front end application'
    });
  });
};