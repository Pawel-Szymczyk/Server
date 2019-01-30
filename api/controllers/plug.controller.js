'use strict';

const db = require('../config/db.config');
const Plug = db.plugs;

// Post an Area
exports.create = (req, res) => {	
	// Save to MariaDB database
    Plug.create({  
        name: req.body.name,
        powerState: req.body.powerState,
        topic: req.body.topic,
        areaId: req.body.areaId
	})
    .then(plug => {		
        // Send created device to client
        res.json(plug);
    })
    .catch(error => res.status(400).send(error))
};