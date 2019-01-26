const mqtt = require('mqtt');

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = 'mqtt://192.168.0.11:8080';
    this.username = 'MosquittoAdmin'; // mqtt credentials if these are needed to connect
    this.password = '9Mosq1TT0pSw';

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
    this.mqttClient.on('message', function (topic, message) {
     // console.log(message.toString());
      // use some method to receive the mesage. <here> !
        var msg = message.toString();
        if(topic === '/devices/rollet/update') {
            // put here a method to read message 
        }
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  // Sends a mqtt message to topic
  sendMessage(topic, message) {
    this.mqttClient.publish(topic, message);
  }

  

}

module.exports = MqttHandler;