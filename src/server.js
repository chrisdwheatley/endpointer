var express = require('express');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var readdirp = require('readdirp');

var app = express();

var port = 80;

app.use(express.static(__dirname + '/endpoints'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));

app.use(express.bodyParser());

app.get('/', function(req, res) {

  readdirp({
    root: 'endpoints'
  }, function(err, files) {
    if (err) throw err;
    res.render('index', {
      files: files.files
    });
  });

});

app.post('/', function(req, res) {
  res.redirect('/');

  var input = req.body.path;
  var file = path.basename(input);
  var endpointPath = 'endpoints/' + input;
  var dir = path.dirname(endpointPath);

  var json = req.body.json;

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

  res.end();

});

app.listen(port);

console.log('Listening on port %s', port);