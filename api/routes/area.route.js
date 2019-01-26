'use strict';

module.exports = function(app) {
    const areas = require('../controllers/area.controller');

    // Create a new area
    app.post('/api/v1/areas/create', areas.create);

    // Get all areas
    app.get('/api/v1/areas', areas.findAll);

    // Get specific area
    app.get('/api/v1/areas/:areaId', areas.findById);

    // Update specific area
    // Note: possibly to change it from put to patch
    app.put('/api/v1/areas/:areaId', areas.update);

    // Delete specific area 
    app.delete('/api/v1/areas/:areaId', areas.delete);
}