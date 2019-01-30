'use strict';

// this model is not necessary anymore, if test sucessfulled completed - remove it.

module.exports = (sequelize, Sequelize) => {
	const Device = sequelize.define('device', {
        // name: {
        //     type: Sequelize.STRING
        // },
        // powerState: {
        //     type: Sequelize.STRING
        // },
        // // deviceActionState: {
        // //     type: Sequelize.STRING
        // // },
        // topic: {
        //     type: Sequelize.STRING
        // },
        // areaId: {
        //     type: Sequelize.INTEGER
        // }
	});
	
	return Device;
}