const env = {

  database: 'home_automation_db',
    username: 'root',
    password: 'Welcome123',
    host: '127.0.0.1',
    port: 3305,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // mqttHost: 'mqtt://192.168.0.11:1883',
    // mqttUsername: 'MosqAdmin',
    // mqttPassword: '9Mosq1TT0pS',
    mqttHost: 'mqtt://m23.cloudmqtt.com:11023',
    mqttUsername: 'ugnmeooe',
    mqttPassword: 'CVPkjCWOrJWU',

    // secretKey: 'th1s1s53cr37k3y'
    secretKey: 'thisissparta'

};
   
module.exports = env;