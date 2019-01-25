'use strict';

module.exports = function (app, mqtt) {
  
    // get controller (db) here
    var rollet = require('../controllers/RolletController');

    app.route('/api/devices/rollet')
        .post(
            (req, res) => {
                mqttClient.sendMessage({"state":"on","action":"stop"}, '/devices/rollet/update');
                res.status(200).send("Message sent to mqtt");
            }
        );
    

};