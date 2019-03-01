'use strict';

module.exports = (sequelize, Sequelize) => {
	const RGB = sequelize.define('rgb', {
        name: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        powerState: {
            type: Sequelize.STRING
        },
        // add colors
        topic: {
            type: Sequelize.STRING
        },
        areaId: {
            type: Sequelize.INTEGER
        }
	});
	
	return RGB;
}