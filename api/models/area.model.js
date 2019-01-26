'use strict';

module.exports = (sequelize, Sequelize) => {
	const Area = sequelize.define('area', {
        // id: {
        //     type: Sequelize.INTEGER
        // },
        name: {
            type: Sequelize.STRING
        },
        areaState: {
            type: Sequelize.STRING
        },
        owner: {
            type: Sequelize.STRING
        }
	});
	
	return Area;
}