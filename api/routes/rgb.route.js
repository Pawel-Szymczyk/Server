'use strict';

const validate = require('../handlers/tokens.handler');

module.exports = function (app, mqtt) {

    // get rgb controller (db)
    let rgb = require('../controllers/rgb.controller');
  

    // Create a new rgb
    app.post('/api/v1/devices/rgb/create', validate.AuthenticationToken, rgb.create);
    
    // Get specific rgb
    app.get('/api/v1/devices/rgb/:rgbId', validate.AuthenticationToken, rgb.findById);
    
    // Update specific rgb
    app.put('/api/v1/devices/rgb/:rgbId', validate.AuthenticationToken, rgb.update);
    
    // Delete specific rgb 
    app.delete('/api/v1/devices/rgb/delete/:rgbId', validate.AuthenticationToken, rgb.delete);

    // MQTT rgb controll
    app.route('/api/v1/devices/rgb', validate.AuthenticationToken)
        .post(
            
            function(req, res) {
                
                var object = {
                    state: req.body.state,
                    hue: req.body.hue,
                    saturation: req.body.saturation,
                    value: req.body.value,
                    brightness: req.body.brightness,
                    option: req.body.option
                };

                mqtt.sendMessage('/devices/rgb/' + req.body.serialNumber + '/update', JSON.stringify(object));

                let message = mqtt.getMessages();   // problem the returned message is always behind one msg; 


                res.status(200).send(object);
                // if(message !== 'x'){
                //     res.status(200).send(JSON.parse(message));
                // } else {
                //     res.status(200).send(object);
                // }
            }
        );
    

};