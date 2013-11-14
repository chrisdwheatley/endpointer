# Endpointer

Endpointer allows rapid integration of JSON endpoints into your front end application, helping you;

* Have a set of reliable endpoints to hit when your application may be in a state of flux
* Keep stubbed or test JSON out of your codebase
* Easily amend the values being passed through into your application

## Getting Started

Endpointer is being developed with the aim of being a deployable instance accessible to your whole team. Currently however the quickest and most reliable way to get up and running is to use the application on your local machine.

#### Dependencies

* nodejs
* npm

#### Local Machine

*Endpointer will currently run on port 80, you can change this in the config within `src/server.js`.*

Clone the repository

`$ git clone git@github.com:swirlycheetah/endpointer.git`

cd into to folder

`$ cd endpointer`

Install the required dependencies

`$ npm install`

Start the application

`$ node src/server.js`

Open the application within your browser by visiting `localhost`.

## Roadmap

This is very much an alpha release, there are many more features planned, including;

* Tests
* Full Heroku support (currently you can deploy to Heroku but there is no support for true file uploads as Heroku has an ephemeral filesystem)
* EC2 support
* Design

## Licence

Endpointer is released under the MIT license:
[opensource.org/licenses/MIT](http://opensource.org/licenses/MIT)



