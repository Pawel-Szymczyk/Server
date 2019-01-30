'use strict';

module.exports = (sequelize, Sequelize) => {
	const Plug = sequelize.define('plug', {

        name: {
            type: Sequelize.STRING
        },
        powerState: {
            type: Sequelize.STRING
        },
        topic: {
            type: Sequelize.STRING
        },
        areaId: {
            type: Sequelize.INTEGER
        }
	});
	
	return Plug;
}