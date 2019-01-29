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

// Get all areas
exports.findAll = (req, res) => {
    Area.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] } // I m not sure if I want to remove it from req
    })
    .then(areas => {
        //res.json(areas);
        res.json({ areas: areas });
    })
    .catch(error => res.status(400).send(error))
};

// Find a Area by Id
exports.findById = (req, res) => {	
	Area.findById(req.params.areaId,
        {attributes: { exclude: ["createdAt", "updatedAt"] }}
    )
    .then(area => {
        if (!area){
            return res.status(404).json({message: "Area Not Found"})
        }

        return res.status(200).json(area)
    })
    .catch(error => res.status(400).send(error));
};

// Update an Area
exports.update = (req, res) => {
	return Area.findById(req.params.areaId)
		.then(area => {
            if(!area){
                return res.status(404).json({
                    message: 'Area Not Found',
                });
            }
            return area.update({
                name: req.body.name,
                areaState: req.body.areaState,
                owner: req.body.owner
            })
            .then(() => res.status(200).json(area))
            .catch((error) => res.status(400).send(error));
        })
		.catch((error) => res.status(400).send(error));			 
};

// Delete an Area by Id
exports.delete = (req, res) => {
	return Area
        .findById(req.params.areaId)
        .then(area => {
            if(!area) {
                return res.status(400).send({
                    message: 'Area Not Found',
                });
            }
 
            return area.destroy()
            .then(() => res.status(200).json({message: "Area removed successfully!"}))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
};