var express = require('express');
var fs = require('fs');

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

  var path = req.body.path;
  var fullPath = 'endpoints/' + path;
  var json = req.body.json;

  fs.writeFile(fullPath, json, function(err) {
    if (err) throw err;
    console.log('Saved to %s', fullPath);
  });

  res.end();

});

app.listen(port);

console.log('Listening on port %s', port);