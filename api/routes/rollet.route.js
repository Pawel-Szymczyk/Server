'use strict';

module.exports = function (app, mqtt) {
  
    // get rollet controller (db) 
    var rollet = require('../controllers/rollet.controller');

    // Create a new rollet
    app.post('/api/v1/devices/rollet/create', rollet.create);
    
    // Get specific rollet
    app.get('/api/v1/devices/rollet/:rolletId', rollet.findById);
    
    // Update specific rollet
    app.put('/api/v1/devices/rollet/:rolletId', rollet.update);
    
    // Delete specific rollet 
    app.delete('/api/v1/devices/rollet/delete/:rolletId', rollet.delete);

    // MQTT rollet controll
    app.route('/api/v1/devices/rollet')
        .post(
            
            function(req, res) {
                
                var object = {
                    state: req.body.state,
                    action: req.body.action
                };

                mqtt.sendMessage('/devices/rollet/update', JSON.stringify(object));
                let message = mqtt.getMessages();   // problem the returned message is always behind one msg; 

                rollet.changeRolletPosition(); // update db here ?

                res.status(200).send(object);
                // if(message !== 'x'){
                //     res.status(200).send(JSON.parse(message));
                // } else {
                //     res.status(200).send(object);
                // }
            }
        );
    

};