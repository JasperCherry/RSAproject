var express = require('express');
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
app.get('/firstCall', function(req, res) {
    console.log("confirmation - first call has been made");
    res.send({'msg':'first call has been made'});
});