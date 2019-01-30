'use strict';

module.exports = function (app, mqtt) {
  
    // get plug controller (db) 
    var plug = require('../controllers/plug.controller');

    // Create a new plug
    app.post('/api/v1/devices/plug/create', plug.create);
    
    // Get specific plug
    app.get('/api/v1/devices/plug/:plugId', plug.findById);
    
    // Update specific plug
    app.put('/api/v1/devices/plug/:plugId', plug.update);
    
    // Delete specific plug 
    app.delete('/api/v1/devices/plug/delete/:plugId', plug.delete);
 

    // TODO: rewrite url
    app.route('/api/v1/devices/desklight')
        .post(
            function(req, res) {
                
                var object = {
                    state: req.body.state
                };

                mqtt.sendMessage('/devices/light', JSON.stringify(object));
                //let message = mqtt.getMessages();   // problem the returned message is always behind one msg; 

                // rollet.changeRolletPosition(); // update db here ?

                res.status(200).send(object);
                // if(message !== 'x'){
                //     res.status(200).send(JSON.parse(message));
                // } else {
                //     res.status(200).send(object);
                // }
            }
        );
    

};