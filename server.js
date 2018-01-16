// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var url = require('url');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/date/:value", function (request, response) {
  var params = request.params.value;
  var validDate = (new Date(params)).getTime() > 0;
  var validTimestamp = (new Date(params * 1000)).getTime() > 0;
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
  if(validDate){
    var date = new Date(params);
    var stringDate = date.toLocaleDateString('en-US', options);
    var unixDate = date.getTime();
    response.status(200).send({unix: unixDate, string: stringDate});
  }
  if (validTimestamp){
    var date = new Date(params * 1000);
    var stringDate = date.toLocaleDateString('en-US', options);
    var unixDate = date.getTime();
    response.status(200).send({unix: unixDate, string: stringDate});
  }
  response.send("not good!");
});

/*var url = require('url');
var url_parts = url.parse(request.url, true);
var query = url_parts.query; */

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
