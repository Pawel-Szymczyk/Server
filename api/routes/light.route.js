'use strict';

module.exports = function (app, mqtt) {
  
    // get controller (db) here
    //var rollet = require('../controllers/RolletController');
 
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