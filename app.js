var app = require("./server/routes.js"),
	port = process.env.PORT || 8000;

// Start the server
var server = app.listen(port, function() {
 console.log('Listening on port %d', server.address().port);
});