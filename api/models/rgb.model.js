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
        serialNumber: {
            type: Sequelize.STRING
        },
        hue: {
            type: Sequelize.INTEGER
        },
        saturation: {
            type: Sequelize.INTEGER
        },
        value: {
            type: Sequelize.INTEGER
        },
        brightness: {
            type: Sequelize.INTEGER
        },
        option: {
            type: Sequelize.STRING
        },
        topic: {
            type: Sequelize.STRING
        },
        areaId: {
            type: Sequelize.INTEGER
        }
	});
	
	return RGB;
}