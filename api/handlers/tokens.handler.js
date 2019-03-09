const jwt = require('jsonwebtoken');
var crypto = require("crypto");
const env = require('../config/env');

module.exports = {

    generateAuthorizationToken: function(data) {
            
        var token = jwt.sign({data}, env.secretKey);
    
        return token;
    },
   
    validateAuthorizationToken: function(req, res, next) {
        //Get auth header token
        const bearerHeader  = req.headers['authorizationtoken'];

        // Check if bearer is undefined
        if(typeof bearerHeader !== 'undefined') {

            // Split at the space
            const bearer = bearerHeader.split(' ');

            // Get token from array
            const bearerToken = bearer[1];

            // set the token
            //req.token = bearerToken;

            // Verify token...
            jwt.verify(bearerToken, env.secretKey, (err, data) => {
                if(err) {
                    res.sendStatus(403);
                } else {
                    // return token data...
                    // req.data = data;
                    // console.log(req.data);
                    req.data = true;
                }
            });

            // Next middleware
            next();
        } else {
            // forbidden
            res.sendStatus(403);
        }
    },

    generateAuthenticationToken: function() {

        // generate random key.
        var id = crypto.randomBytes(20).toString('hex');

        var token = jwt.sign({data: id}, env.secretKey, {expiresIn: '1m'}); // change to 24 h
    
        return token;
    }, 

    AuthenticationToken: function(req, res, next) {
        //Get auth header token
        const bearerHeader  = req.headers['authenticationtoken'];

        // Check if bearer is undefined
        if(typeof bearerHeader !== 'undefined') {

            // Split at the space
            const bearer = bearerHeader.split(' ');

            // Get token from array
            const bearerToken = bearer[1];

            // Verify token...
            jwt.verify(bearerToken, env.secretKey, (err, data) => {
                if(err) {
                    res.sendStatus(403);
                } else {

                    console.log('true');
                    // return token data...
                    //req.expTime = data.exp;
                    //req.data = data;

                    // let obj = {
                    //     isValid: true,
                    //     exp: data.exp,
                    // }

                    req.data = true;
                   // req.data = obj;
                }
            });

            // Next middleware
            next();
        } else {
            // forbidden
            res.sendStatus(403);
        }
    }


}

