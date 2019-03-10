const { check } = require('express-validator/check');
const { filter } = require('express-validator/filter');

module.exports = {

    validateAreaInput: [
        check('name')
            .trim() // trims characters (whitespace by default) at the beginning and at the end of a string
            .isLength({ min:1 }).withMessage('All fields are required.')
            .stripLow() // remove ASCII control characters, which are normally invisible
            .escape(),  // replaces <, >, &, ', " and / with their corresponding HTML entities

        check('areaState')
            .trim()
            .isLength({ min:1 }).withMessage('All fields are required.')
            .escape()
            .stripLow(),

        check('owner')
            .trim()
            .isLength({ min:1 }).withMessage('All fields are required.')
            .escape()
            .stripLow()
    ],



};