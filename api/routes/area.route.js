'use strict';

module.exports = function(app) {
    const areas = require('../controllers/area.controller');

     // Create a new Area
     app.post('/api/v1/areas/create', areas.create);

     app.get('/api/v1/areas', areas.findAll);
}