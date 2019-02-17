'use strict';

const inputValidationHandler = require('../handlers/userValidation.handler');
const validate = require('../handlers/tokens.handler');

module.exports = function(app) {
    const users = require('../controllers/user.controller');

    // User registration...
    app.post('/api/v1/users/registration', inputValidationHandler.validateRegistrationInput, users.registration);

    // User login...
    app.post('/api/v1/users/login', inputValidationHandler.validateLoginInput, validate.validateAuthorizationToken, users.login);

    // find user
    app.post('/api/v1/users/resetpassword', inputValidationHandler.validateResetPassword, users.resetPassword); 

    // update user with new password details
    app.put('/api/v1/users/newpassword', inputValidationHandler.validateNewPassword, validate.AuthenticationToken, users.newPassword); 

    //app.post('/api/v1/users/test', validation.validateAuthenticationToken, users.test);
 
    // Get all areas
    // Note: propably it will not be used at all
    //app.get('/api/v1/users', users.findAll);

    // Get specific user 
    app.get('/api/v1/users/:userId', validate.AuthenticationToken, users.findById);

    // Update specific user
    // Note: possibly to change it from put to patch
    app.put('/api/v1/users/:userId', users.update);

    // Delete specific user
    app.delete('/api/v1/users/:userId', users.delete);
}