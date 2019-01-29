'use strict';

module.exports = (sequelize, Sequelize) => {
	const Device = sequelize.define('device', {
        name: {
            type: Sequelize.STRING
        },
        powerState: {
            type: Sequelize.STRING
        },
        deviceActionState: {
            type: Sequelize.STRING
        },
        topic: {
            type: Sequelize.STRING
        },
        areaId: {
            type: Sequelize.INTEGER
        }
	});
	
	return Device;
}