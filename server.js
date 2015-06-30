var aplication = require("./server/routes.js"),
	server = aplication.server,
	app = aplication.app,
	port = process.env.PORT || 8000;

// Start the server
server.listen(port, function() {
  console.log("Node app is running at localhost:" + port);
});