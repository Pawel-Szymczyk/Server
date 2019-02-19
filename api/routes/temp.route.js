
module.exports = function (app, mqtt) {
    app.route('/api/v1/devices/temp')
        .put(
            function(req, res) {

                // convert input boolean to string state
                // var convertedState = plug.convertBoolInputToStringOutput(req.body.powerState);
                
                var object = {
                    state: true
                };

                // var dbObject = {
                //     plugId: req.body.plugId,
                //     name: req.body.name,
                //     type: req.body.type,
                //     powerState: convertedState,
                //     serialNumber: req.body.serialNumber,
                //     topic: req.body.topic,
                //     areaId: req.body.areaId
                // }
                

                // update a device
                mqtt.sendMessage('/devices/temp/' + req.body.serialNumber + '/update', JSON.stringify(object));
                //mqtt.sendMessage('/devices/plug/update', JSON.stringify(object));
                let message = mqtt.getMessages();   // problem the returned message is always behind one msg; 

                // update a database
                // plug.updateMqttDB(dbObject);

                res.status(200).send({msg: message});
                // if(message !== 'x'){
                //     res.status(200).send(JSON.parse(message));
                // } else {
                //     res.status(200).send(object);
                // }
            }
        )
}