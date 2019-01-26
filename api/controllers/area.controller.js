const db = require('../config/db.config');
const Area = db.areas;

// Post an Area
exports.create = (req, res) => {	
	// Save to MariaDB database
	Area.create({  
			name: req.body.name,
            areaState: req.body.areaState,
            owner: req.body.owner
		})
		.then(area => {		
			// Send created area to client
			res.json(area);
		})
		.catch(error => res.status(400).send(error))
};

exports.findAll = (req, res) => {
    Area.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] } // I m not sure if I want to remove it from req
    })
    .then(areas => {
        res.json(areas);
    })
    .catch(error => res.status(400).send(error))
};
