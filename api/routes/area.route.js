'use strict';

const inputValidationHandler = require('../handlers/inputValidation.handler');
const validate = require('../handlers/tokens.handler');

module.exports = function(app) {
    const areas = require('../controllers/area.controller');

    // Create a new area
    app.post('/api/v1/areas/create', validate.AuthenticationToken, inputValidationHandler.validateAreaInput, areas.create);

    // Get all areas
    app.get('/api/v1/areas', validate.AuthenticationToken, areas.findAll);

    // Get specific area
    app.get('/api/v1/areas/:areaId', validate.AuthenticationToken, areas.findById);

    // Update specific area
    // Note: possibly to change it from put to patch
    app.put('/api/v1/areas/:areaId', validate.AuthenticationToken, inputValidationHandler.validateAreaInput, areas.update);

    // Delete specific area 
    app.delete('/api/v1/areas/:areaId', validate.AuthenticationToken, areas.delete);
}