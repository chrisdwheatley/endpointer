var express = require('express');

var app = express();

var port = 80;

app.use(express.static(__dirname + '/public'));
app.use(express.logger('dev'));
app.use(express.bodyParser());

app.get('/', function(req, res){
  var body = '<form action="/" method="post"><input type="text" id="path" name="path"></input></div><input type="submit" value="submit"></input></form>';
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

app.post('/', function(req, res) {
    res.redirect('/');
    var path = req.body.path;
    // res.send(path);
    console.log("post received: %s", path);
    res.end();
});

app.listen(port);

console.log('Listening on port ' + port);