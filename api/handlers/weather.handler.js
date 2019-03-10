var weather = require('openweather-apis');

class WeatherHandler {
    constructor() {
        this.key = '2299c0a27ff4200cbafabad1598a1bbc';
    }

    setup() {
        // setup language
        weather.setLang('en');

        // set city bby name
        weather.setCity('Portsmouth');

        // setup units
        weather.setUnits('metric');

        // setup unique key
        weather.setAPPID(this.key);

    }

    getTemp(result) {
        weather.getTemperature(function(err, temp){         // w ten sam sposob zrob mqtt
            result(temp);
            //if(err) console.log(err);
        });
    }

    getPressure(result) {
        weather.getPressure(function(err, press){         // w ten sam sposob zrob mqtt
            result(press);
            //if(err) console.log(err);
        });
    }

    getHumidity(result) {
        weather.getHumidity(function(err, hum){         // w ten sam sposob zrob mqtt
            result(hum);
            //if(err) console.log(err);
        });
    }

    getDescription(result) {
        weather.getDescription(function(err, desc){         // w ten sam sposob zrob mqtt
            result(desc);
            //if(err) console.log(err);
        });
    }

    // this function is returnig null (!?)
    getBasicWeatherData(result) {
        weather.getSmartJSON(function(smart){
            //console.log(smart);
            result(smart);
        });
    }

    getTheWeather(result) {
        weather.getAllWeather(function(err, JSONObj){
            result(JSONObj);
        });
    }

}

module.exports = WeatherHandler;