
const { validationResult } = require('express-validator/check');
const errorHandler = require('../handlers/error.handler');
const bcrypt = require('bcryptjs');
const validation = require('../handlers/tokens.handler');

const db = require('../config/db.config');
const UserDB = db.users;

// Register a new user to the system.
exports.registration = (req, res) => {	

    var errors = validationResult(req).formatWith(errorHandler.errorFormatter);

    if (!errors.isEmpty()) { 
        res.status(400).json(errors.array());
    } else {

        let hashedPassword = ({
            password: req.body.password
        })

        // -------------------------------------------------------------------
        // Create authorization Token.
        //
        let authorizationData = {
            'form': 'mobileapp',
            'username': req.body.username,
            'userType': 'user',
            'isValid': 'true'
        }
        let token = validation.generateAuthorizationToken(authorizationData);
        // -------------------------------------------------------------------

        // Encrypt password and add user to db.
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(hashedPassword.password, salt, function(err, hash) {
                if(err) {
                    console.log(err);
                }

                hashedPassword.password = hash;

                UserDB.create({  
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    username: req.body.username,
                    password: hashedPassword.password,
                    authorizationToken: token,
                    secretAnswer: req.body.secretAnswer
                })
                .then(user => {		

                    // Send created area to client
                    let message = ({
                        state: 'success',
                        userId: user.id,
                        message: 'You are now registered and can log in',
                        authorizationToken: user.authorizationToken,
                    });
                    res.json(message);

                })
                .catch(error => res.status(400).send(error))

            })
        });
    }
};


exports.login = (req, res) => {	
    
    // --------------------------------------------------------------------------
    // Authorization Token further validation.
    // Go to tokens.handler.js 
    //

    if(req.data) {

        // --------------------------------------------------------------------------
        // Find user by its unique username
        //
        UserDB.findOne(
            { 
                where: { username: req.body.username, }
            }
        )
        .then(user => {
            if (!user){
                console.log('no users')
                return res.status(404).json({message: "Wrong username or passowrd."})
            }
                console.log(req.body.password + ', '+ user.password)
            bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
                //if(err) throw err;
                if(isMatch) {

                    // Get authentication token...
                    let authenticationKey = validation.generateAuthenticationToken();

                    let userLog = {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        username: user.username,
                        authenticationToken: authenticationKey
                    }

                 //   res.user = userLog;

                    return res.status(200).json({user: userLog});
                } else {
                    console.log('wrong in decryption')
                    return res.status(404).json({message: 'Wrong username or passowrd.'})
                }
            })

        })
        .catch(error => res.status(400).send(error));
        // --------------------------------------------------------------------------

    } else {
        return res.status(405).json({message: 'Your authorization Token is invalid'});
    }
    // --------------------------------------------------------------------------
};


exports.resetPassword = (req, res) => {
    
    // --------------------------------------------------------------------------
    // Find user by its unique email and secret answer
    //
    UserDB.findOne(
        { 
            where: { 
                email: req.body.email, 
                secretAnswer: req.body.secretAnswer
            }
        }
    )
    .then(user => {
        if (!user){
            return res.status(404).json({message: "Wrong credentials"})
        }

        let authenticationKey = validation.generateAuthenticationToken();

        let obj = {
            userId: user.id,
            isValid: true,
            authenticationToken: authenticationKey
        };

        return res.status(200).json(obj);

    })
    .catch(error => res.status(400).send(error));
};

// update user password
exports.newPassword = (req, res) => {

    var errors = validationResult(req).formatWith(errorHandler.errorFormatter);

    if (!errors.isEmpty()) {
        res.status(400).json(errors.array());
    } else {
    
        return UserDB.findById(req.body.id)
            .then(user => {
                if(!user){
                    return res.status(404).json({
                        message: 'User Not Found',
                    });
                }

                let hashedPassword = ({
                    password: req.body.password
                })

                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(hashedPassword.password, salt, function(err, hash) {
                        if(err) {
                            console.log(err);
                        }
        
                        hashedPassword.password = hash;


                        return user.update({
                            // Note: Again security required
                            password: hashedPassword.password,
                            
                        })
                        .then(() => res.status(200).json({'mnessage': 'Password changed succesfully,'}))
                        .catch((error) => res.status(400).send(error));
                    })
                });
            })
            .catch((error) => res.status(400).send(error));		
    }
};














// TODO: provide token validation
// Get all areas
exports.findAll = (req, res) => {
    UserDB.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] } // I m not sure if I want to remove it from req
    })
    .then(users => {
        res.json(users);
    })
    .catch(error => res.status(400).send(error))
};

// Find a Area by Id
exports.findById = (req, res) => {	
	UserDB.findById(req.params.userId,
        {attributes: { exclude: ["createdAt", "updatedAt"] }}
    )
    .then(user => {
        if (!user){
            return res.status(404).json({message: "User Not Found"})
        }

        return res.status(200).json(user)
    })
    .catch(error => res.status(400).send(error));
};

// Update an Area
exports.update = (req, res) => {
	return UserDB.findById(req.params.userId)
		.then(user => {
            if(!user){
                return res.status(404).json({
                    message: 'User Not Found',
                });
            }
            return user.update({
                // Note: Again security required
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                authenticationKey: req.body.authenticationKey,
            })
            .then(() => res.status(200).json(user))
            .catch((error) => res.status(400).send(error));
        })
		.catch((error) => res.status(400).send(error));			 
};

// Delete an Area by Id
exports.delete = (req, res) => {
	return UserDB
        .findById(req.params.userId)
        .then(user => {
            if(!user) {
                return res.status(400).send({
                    message: 'User Not Found',
                });
            }
 
            return user.destroy()
            .then(() => res.status(200).json({message: "User removed from database successfully!"}))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
};