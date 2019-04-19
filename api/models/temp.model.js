'use strict';

module.exports = (sequelize, Sequelize) => {
	const Temp = sequelize.define('temp', {
        
        // name: {
        //     type: Sequelize.STRING
        // },
        // type: {
        //     type: Sequelize.STRING
        // },
        // powerState: {
        //     type: Sequelize.STRING
        // },
        // serialNumber: {
        //     type: Sequelize.STRING
        // },
        // topic: {
        //     type: Sequelize.STRING
        // },


        // timeStart: {
        //     type: Sequelize.TIME
        // },
        // timeStop: {
        //     type: Sequelize.TIME
        // },
        // areaId: {
        //     type: Sequelize.INTEGER
        // }
	});
	
	return Temp;
}