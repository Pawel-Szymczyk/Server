
const { validationResult } = require('express-validator/check');
const errorHandler = require('../handlers/error.handler');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const db = require('../config/db.config');
const UserDB = db.users;

// Post an User
exports.registration = (req, res) => {	

    var errors = validationResult(req).formatWith(errorHandler.errorFormatter);

    if (!errors.isEmpty()) {
        res.status(400).json(errors.array());
    } else {

        let hashedPassword = ({
            password: req.body.password
        })

        // Encrypt password and add user to db.
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(hashedPassword.password, salt, function(err, hash) {
                if(err) {
                    console.log(err);
                }

                hashedPassword.password = hash;
                // TODO: create authorization key here and save to db and return with successful message

                UserDB.create({  
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    username: req.body.username,
                    password: hashedPassword.password
                })
                .then(user => {		

                    // Send created area to client
                    let message = ({
                        state: 'success',
                        userId: user.id,
                        message: 'You are now registered and can log in',
                        authenticationToken: ''
                    });
                    res.json(message); // change message with authorization key

                })
                .catch(error => res.status(400).send(error))

            })
        });
    }
};


exports.login = (req, res) => {	

    UserDB.findOne(
        { 
            where: { username: req.body.username, }
        }
    )
    .then(user => {
        if (!user){
            return res.status(404).json({message: "User Not Found"})
        }

        // TODO: authorization/ and authentication missing..


        bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
            //if(err) throw err;
            if(isMatch) {
                return res.status(200).json(user)
            } else {
                return res.status(404).json({message: 'Wrong password'})
            }
        })

    })
    .catch(error => res.status(400).send(error));
    
};


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