'use strict';

module.exports = (sequelize, Sequelize) => {
	const Plug = sequelize.define('plug', {
        
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
        topic: {
            type: Sequelize.STRING
        },

        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        },
                // TODO: add these fields to database
        // switch_ON: {
        //     type: Sequelize.DATE
        // },
        // switch_OFF: {
        //     type: Sequelize.DATE
        // },
        // overallTotal: {
        //     type: Sequelize.DATE
        // },
        // total_ON: {
        //     type: Sequelize.DATE
        // },
        // total_OFF: {
        //     type: Sequelize.DATE
        // },

        // timeStart: {
        //     type: Sequelize.TIME
        // },
        // timeStop: {
        //     type: Sequelize.TIME
        // },
        areaId: {
            type: Sequelize.INTEGER
        }
	});
	
	return Plug;
}