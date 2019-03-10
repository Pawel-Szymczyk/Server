'use strict';

const validate = require('../handlers/tokens.handler');

module.exports = function (app, weather) {
  
    // get plug controller (db) 
    //var weather = require('../controllers/weather.controller');

  
    // Get specific plug
    // app.get('/api/v1/devices/plug/:plugId',  validate.AuthenticationToken, plug.findById);
        
    // // Delete specific plug 
    // app.delete('/api/v1/devices/plug/delete/:plugId',  validate.AuthenticationToken, plug.delete);
    
    // app.route('/api/v1/weather/temperature').get(
        
        
    //         //  // get the Temperature  
    //         // weather.getTemperature(function(err, temp){
    //         //     console.log(temp);
    //         // });
       
    // )

    app.route('/api/v1/weather/temperature' ).get(
        function(req, res) {
            
            //const we = weather.getBasicWeatherData();
            // let we = weather.getTemp();

           //console.log(weather.getTemp());


           weather.getPressure(function(x) {
            console.log("pressure: " + x)
           });

           weather.getHumidity(function(x) {
               console.log("humidity: " + x);
           });

           weather.getDescription(function(x) {
            console.log("description: " + x);
            });
           

            weather.getTemp(function(x) {
                console.log("temperature: " + x)

                var obj = {
                    temp: x
                }
                res.status(200).send(obj);
            });

            

            
       // weather.getTemp()
            //  // get the Temperature  
            // weather.getTemperature(function(err, temp){
            //     console.log(temp);
            // });

            
        }
    )



  
        
    

};