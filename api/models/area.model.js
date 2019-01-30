'use strict';

module.exports = (sequelize, Sequelize) => {
	const Area = sequelize.define('area', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
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