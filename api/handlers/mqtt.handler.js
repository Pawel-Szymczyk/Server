const mqtt = require('mqtt');
const env = require('../config/env');

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = env.mqttHost;
    this.username = env.mqttUsername; // mqtt credentials if these are needed to connect
    this.password = env.mqttPassword;

    this.retMessage = 'x';
  }


  
  connect() {

    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password });

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe('/devices/rollet/update', {qos: 1});
    this.mqttClient.subscribe('/devices/rgb', {qos: 1});
    this.mqttClient.subscribe('/devices/light', {qos: 1});

    // When a message arrives, console.log it
    // this.mqttClient.on('message', function (topic, message) {
    //  // console.log(message.toString());
    //   // use some method to receive the mesage. <here> !
    //      var msg = message.toString();
    //     // console.log(msg);
    //     this.message = msg;
    // });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  // Sends a mqtt message to topic
  sendMessage(topic, message) {
    this.mqttClient.publish(topic, message);
  }

  getMessages() {
      this.mqttClient.on('message', (topic, message) => {
           var msg = message.toString();
        //    console.log("hehehehe")
          //  console.log(msg);
            this.retMessage = msg;

       });

        return this.retMessage;
       
  }

  

}

module.exports = MqttHandler;