'use strict';

module.exports = (sequelize, Sequelize) => {
	const Rollet = sequelize.define('rollet', {
        name: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        powerState: {
            type: Sequelize.STRING
        },
        actionState: {
            type: Sequelize.STRING
        },
        serialNumber: {
            type: Sequelize.STRING
        },
        topic: {
            type: Sequelize.STRING
        },
        areaId: {
            type: Sequelize.INTEGER
        }
	});
	
	return Rollet;
}