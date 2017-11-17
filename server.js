var Client = require('node-wolfram');
var Wolfram = new Client('LU2W26-EPRQKKG36V');
var express = require('express');
var sha256 = require('sha256');
var app = express();
// using router to separate url
var router = express.Router();
// data exchange configuration
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// start express server
var server = app.listen(8080, function() {
  console.log('Server is running at : ' + server.address().port);
});


app.get('/rsa/:m/:e/:n', function(req, res) {
  m = req.params.m;
  e = req.params.e;
  n = req.params.n;
  Wolfram.query('(' + m + '^' + e + ') mod ' + n, function(err, result) {
    if (err)
      console.log(err);
    else {
      let output = (result.queryresult.pod[1].subpod[0].plaintext[0]);
      res.send({
        'result': output
      });
    }
  });
});

app.get('/sha/:string', function(req, res) {
  string = req.params.string;
  output = (sha256(string));
  res.send({
    'result': output
  });
});
