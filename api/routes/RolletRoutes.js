'use strict';

module.exports = function (app) {
  
    // get controller (db) here
    var rollet = require('../controllers/RolletController');

    app.route('/api/devices/rollet')
        .post();
    

};