'use strict';

module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        secretAnswer: {
            type: Sequelize.STRING
        },
        authorizationToken: {
            type: Sequelize.STRING
        }
	});
	
	return User;
} 