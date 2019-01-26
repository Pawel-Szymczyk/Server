// -------------------------------------------------
// Import libraries.
//
var express = require('express');
var bodyParser = require("body-parser");
// -------------------------------------------------

// -------------------------------------------------
// Import ...
//
var mqttHandler = require('./api/handlers/MqttHandler');
// -------------------------------------------------

var app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


var mqttClient = new mqttHandler();
    mqttClient.connect();
    

// -------------------------------------------------
// Import routes.
//
var rollets = require('./api/routes/RolletRoutes');

// Registering routes.
rollets(app, mqttClient); 

// -------------------------------------------------

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("app running on port.", port);
});