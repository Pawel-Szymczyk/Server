// -------------------------------------------------
// Import libraries.
//
const express = require('express');
const bodyParser = require("body-parser");
const passport = require('passport');
// -------------------------------------------------

// -------------------------------------------------
// Import ...
//
const db = require('./api/config/db.config');
var mqttHandler = require('./api/handlers/mqtt.handler');
// require('./api/handlers/password.handler');
// -------------------------------------------------

var app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // app.use(passport.initialize());
    // app.use(passport.session());

var mqttClient = new mqttHandler();
    mqttClient.connect();
    

// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync with { force: true }');
//   });

// -------------------------------------------------
// Import routes.
//
require('./api/routes/user.route')(app);
require('./api/routes/area.route')(app);

require('./api/routes/rollet.route')(app, mqttClient);
require('./api/routes/plug.route')(app, mqttClient);

// -------------------------------------------------

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("app running on port.", port);
});