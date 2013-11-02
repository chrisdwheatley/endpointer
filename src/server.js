var express = require('express');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

var app = express();

var port = 80;

app.use(express.static(__dirname + '/endpoints'));
app.use(express.logger('dev'));
app.use(express.bodyParser());

app.get('/', function(req, res) {
  var body = '<form action="/" method="post">' + 'path <input type="text" id="path" name="path"></input>' + 'json <input type="text" id="json" name="json"></input>' + '<input type="submit" value="submit"></input>' + '</form>';

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Content-Length', body.length);

  res.end(body);
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