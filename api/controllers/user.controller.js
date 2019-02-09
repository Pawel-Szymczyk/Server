
const { validationResult } = require('express-validator/check');
const errorHandler = require('../handlers/error.handler');

const db = require('../config/db.config');
const User = db.users;

// Post an User
exports.registration = (req, res) => {	
    // Save to MariaDB database
    
    // Note: This MUST be rewritten to make it as secure as possible 
	// User.create({  
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     email: req.body.email,
    //     username: req.body.username,
    //     password: req.body.password,
    //     //authenticationKey: req.body.authenticationKey,
	// })
    // .then(user => {		
    //     // Send created area to client
    //     res.json(user);
    // })
    // .catch(error => res.status(400).send(error))

    //const name = req.body.firstName;
    // ... more
    //req.checkBody('name', 'Name is required').notEmpty();

    var errors = validationResult(req).formatWith(errorHandler.errorFormatter);

    if (!errors.isEmpty()) {
        res.status(400).json(errors.array());
    } else {
        console.log(req.body.username);
        res.sendStatus(200);
    }

};

exports.test = (req, res) => {

    
    var errors = validationResult(req).formatWith(errorHandler.errorFormatter);

    if (!errors.isEmpty()) {
        res.status(400).json(errors.array());
    } else {
        console.log(req.body.username);
        res.sendStatus(200);
    }

};

// Get all areas
exports.findAll = (req, res) => {
    User.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] } // I m not sure if I want to remove it from req
    })
    .then(users => {
        res.json(users);
    })
    .catch(error => res.status(400).send(error))
};

// Find a Area by Id
exports.findById = (req, res) => {	
	User.findById(req.params.userId,
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
	return User.findById(req.params.userId)
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
	return User
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