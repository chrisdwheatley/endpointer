var fs = require('fs');
var path = require('path');
var express = require('express');
var mkdirp = require('mkdirp');
var readdirp = require('readdirp');

var app = express();

var port = process.env.PORT || 80;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.static(__dirname + '/endpoints'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/vendor", express.static(__dirname + '/vendor'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));

app.use(express.bodyParser());

app.get('/', function(req, res) {

  readdirp({
    root: 'endpoints',
    fileFilter: '*.json'
  }, function(err, files) {
    if (err) throw err;
    res.render('index', {
      files: files.files,
      title: 'Endpointer',
      subtitle: 'Rapidly serve JSON endpoints to your front end application'
    });
  });

});

app.post('/', function(req, res) {

  var input = req.body.path;
  var file = path.basename(input);
  var endpointPath = 'endpoints/' + input;
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

});

app.listen(port, function() {
  console.log("Listening on " + port);
});