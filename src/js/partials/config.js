// project config
var cli = require('commander')
  , defaultPort = 80;

// command line parameters
cli
  .option('h, heroku', 'heroku deployment')
  .option('p, port [number]', 'port [number]')
  .parse(process.argv);

// use heroku's port assignment if deployed there
if (cli.heroku) {
  var port = process.env.PORT || defaultPort;
} else {
  var port = cli.port || defaultPort;
};

exports.baseConfig = {
  port: port,
  jsPartials: './js/partials/',
  endpointPath: '/endpoints'
};