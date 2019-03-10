'use strict';

const validate = require('../handlers/tokens.handler');

module.exports = function (app, weather) {
  

    // get weather data...
    app.route('/api/v1/weather/info' ).get(
         function(req, res) {
        
            weather.getTheWeather(function(data) {
                res.status(200).send(data)
            })

        }
    );
    
};