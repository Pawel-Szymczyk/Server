'use strict';

module.exports = function(app) {
    const devices = require('../controllers/device.controller');

    // Create a new device
    app.post('/api/v1/devices/create/:deviceType', devices.create);

    // // Get all devices
    // app.get('/api/v1/devices', devices.findAll);

    // // Get specific device
    // app.get('/api/v1/devices/:deviceId', devices.findById);

    // // Update specific device
    // // Note: possibly to change it from put to patch
    // app.put('/api/v1/devices/:deviceId', devices.update);

    // // Delete specific device 
    // app.delete('/api/v1/devices/:deviceId', devices.delete);
}