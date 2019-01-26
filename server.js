// -------------------------------------------------
// Import libraries.
//
var express = require('express');
var bodyParser = require("body-parser");
// -------------------------------------------------

// -------------------------------------------------
// Import ...
//
const db = require('./api/config/db.config');
var mqttHandler = require('./api/handlers/mqtt.handler');
// -------------------------------------------------

var app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


var mqttClient = new mqttHandler();
    mqttClient.connect();
    

// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync with { force: true }');
//   });
// -------------------------------------------------
// Import routes.
//
require('./api/routes/area.route')(app);
var rollets = require('./api/routes/rollet.route');

// Registering routes.
rollets(app, mqttClient); 

// -------------------------------------------------

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("app running on port.", port);
});