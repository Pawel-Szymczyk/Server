const { check } = require('express-validator/check');
const { filter } = require('express-validator/filter');

const db = require('../config/db.config');
const UserDB = db.users;
 
module.exports = {

    validateLoginInput: [
        check('username')
            .isLength({ min:1 }).withMessage('Username is required.')
            .trim() // trims characters (whitespace by default) at the beginning and at the end of a string
            .stripLow() // remove ASCII control characters, which are normally invisible
            .escape(),  // replaces <, >, &, ', " and / with their corresponding HTML entities

        check('password')
            .isLength({ min:1 }).withMessage('Password is required.')
            .trim()
            .escape()
            .stripLow()
    ],

    validateRegistrationInput: [
        check('firstName')
            .isLength({ min:1 }).withMessage('First name is a required.')
            .isAlphanumeric().withMessage('First name must be alphanumeric.')
            .trim()
            .escape()
            .stripLow(),

        check('lastName')
            .isLength({ min:1 }).withMessage('Last name is a required.')
            .isAlphanumeric().withMessage('Last name must be alphanumeric.')
            .trim()
            .escape()
            .stripLow(),

        // filter db if email already exists.
        check('email')
            .isEmail().withMessage('Email is not valid.')
            .isLength({ min:1 }).withMessage('Email name is a required.')
            .normalizeEmail()   // canonicalizes an email address.
            .trim()
            .escape()
            .stripLow()
            .custom(value => {
                return UserDB.findOne({ where: { email: value, }})
                .then(user => {
                    if (user) {
                        return Promise.reject('Email already in use. Did you forget password?');
                    }
                });
            }),
        
        check('username')
            .isLength({ min:1 }).withMessage('Username is a required.')
            .isAlphanumeric().withMessage('Username must be alphanumeric.')
            .trim()
            .escape()
            .stripLow()
            .custom(value => {
                return UserDB.findOne({ where: { username: value, }})
                .then(user => {
                    if (user) {
                        return Promise.reject('Username already in use. Did you forget password?');
                    }
                });
            }),

        check('password')
            .isLength({ min:8 }).withMessage('Password must be at least 8 characters in length.')
            .matches('[0-9]').withMessage('Password must contain at least 1 number.')
            .matches('[a-z]').withMessage('Password must contain at least 1 lowercase letter.')
            .matches('[A-Z]').withMessage('Password must contain at least 1 uppercase letter.')
            .trim()
            .escape()
            .stripLow()
            .custom((value, {req, loc, path}) => {
                if (value !== req.body.confirmPassword) {
                    return false;
                } else {
                    return value;
                }
            }).withMessage("Passwords don't match."),
    ],


};

