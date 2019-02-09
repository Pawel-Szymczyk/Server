'use strict';



const inputValidationHandler = require('../handlers/validation.handler');


module.exports = function(app) {
    const users = require('../controllers/user.controller');

    // User registration...
    app.post('/api/v1/users/registration', inputValidationHandler.validateRegistrationInput, users.registration);


    app.post('/validateMe', inputValidationHandler.validateMeChecks, users.test);



    // User login...
    //app.post('api/v1/users/login', user.login);
 
    // Get all areas
    // Note: propably it will not be used at all
    //app.get('/api/v1/users', users.findAll);

    // Get specific user 
    app.get('/api/v1/users/:userId', users.findById);

    // Update specific user
    // Note: possibly to change it from put to patch
    app.put('/api/v1/users/:userId', users.update);

    // Delete specific user
    app.delete('/api/v1/users/:userId', users.delete);
}