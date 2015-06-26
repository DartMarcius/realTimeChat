//var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
module.exports = function(app, express) {
  // Serve static assets from the app folder. This enables things like javascript
  // and stylesheets to be loaded as expected. You would normally use something like
  // nginx for this, but this makes for a simpler demo app to just let express do it.
  app.use("/", express.static(__dirname + "/../public"));

  // Set the view directory, this enables us to use the .render method inside routes
  app.set('views', __dirname + "/../public/views");
  app.engine('handlebars', exphbs({defaultLayout: __dirname + "/../public/views/layouts/main"}));
  app.set('view engine', 'handlebars');
  // parse application/x-www-form-urlencoded
  //app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  //app.use(bodyParser.json());
}
