'use strict';

module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
        name: {
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
        authenticationKey: {
            type: Sequelize.STRING
        }
	});
	
	return User;
}