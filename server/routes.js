var express = require('express');
var app = express();

// Load Express Configuration
require('./expressConfig')(app, express);

app.all('/', function(req, res){
	res.render('index');
});
module.exports = app;