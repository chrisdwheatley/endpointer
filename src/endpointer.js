var express = require('express')
  , setup = require('./js/partials/config.js')
  , config = setup.baseConfig
  , site = require(config.jsPartials + 'site')
  , post = require(config.jsPartials + 'post')
  , app = express();

// jade templates
app.set('views', __dirname + '/html/partials');
app.set('view engine', 'jade');

// static directories
app.use(express.static(__dirname + '../../endpoints'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/js/vendor", express.static(__dirname + '/js/vendor'));

app.use(express.logger('dev'));
app.use(express.bodyParser());

// cross origin headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// index file get request
app.get('/', site.index);

// endpoint post request
app.post('/', post.file);

// server 
app.listen(config.port, function() {
  console.log("Listening on port " + config.port);
});