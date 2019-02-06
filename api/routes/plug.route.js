'use strict';

module.exports = function (app, mqtt) {
  
    // get plug controller (db) 
    var plug = require('../controllers/plug.controller');

    // Create a new plug
    app.post('/api/v1/devices/plug/create', plug.create);
    
    // Get specific plug
    app.get('/api/v1/devices/plug/:plugId', plug.findById);
        
    // Delete specific plug 
    app.delete('/api/v1/devices/plug/delete/:plugId', plug.delete);
 
    // TODO: rewrite url (add a device serial number)
    app.route('/api/v1/devices/plug')
        .put(
            function(req, res) {

                // convert input boolean to string state
                var convertedState = plug.convertBoolInputToStringOutput(req.body.powerState);
                
                var object = {
                    state: convertedState
                };

                var dbObject = {
                    plugId: req.body.plugId,
                    name: req.body.name,
                    type: req.body.type,
                    powerState: convertedState,
                    serialNumber: req.body.serialNumber,
                    topic: req.body.topic,
                    areaId: req.body.areaId
                }

                // update a device
                mqtt.sendMessage('/devices/plug/update', JSON.stringify(object));
                //let message = mqtt.getMessages();   // problem the returned message is always behind one msg; 

                // update a database
                plug.updateMqtt(dbObject);

                // rollet.changeRolletPosition(); // update db here ?

                res.status(200).send({state: plug.convertStringInputToBooleanOutput(convertedState)});
                // if(message !== 'x'){
                //     res.status(200).send(JSON.parse(message));
                // } else {
                //     res.status(200).send(object);
                // }
            }
        )
        
    

};