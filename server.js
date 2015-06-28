var app = require("./server/routes.js");

app.set('port', process.env.PORT || 8000);
// Start the server
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});