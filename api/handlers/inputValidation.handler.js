const { check } = require('express-validator/check');
const { filter } = require('express-validator/filter');

module.exports = {

    validateAreaInput: [
        check('name')
            .isLength({ min:1 }).withMessage('All fields are required.')
            .trim() // trims characters (whitespace by default) at the beginning and at the end of a string
            .stripLow() // remove ASCII control characters, which are normally invisible
            .escape(),  // replaces <, >, &, ', " and / with their corresponding HTML entities

        check('areaState')
            .isLength({ min:1 }).withMessage('All fields are required.')
            .trim()
            .escape()
            .stripLow(),

        check('owner')
            .isLength({ min:1 }).withMessage('All fields are required.')
            .trim()
            .escape()
            .stripLow()
    ],



};