'use strict';

module.exports = function (app, mqtt) {
  
    // get controller (db) here
    var rollet = require('../controllers/RolletController');
 
    app.route('/api/devices/rollet')
        .post(
            
            function(req, res) {
                
                var object = {
                    state: req.body.state,
                    action: req.body.action
                };

                

                mqtt.sendMessage('/devices/rollet/update', JSON.stringify(object));


                rollet.changeRolletPosition(); // update db here ?
                //console.log(mqtt);
                res.status(200).send("Message sent to mqtt");

                
                
            }
            
        );
    

};