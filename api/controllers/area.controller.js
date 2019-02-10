const db = require('../config/db.config');
const Area = db.areas;

// Post an Area
exports.create = (req, res) => {
    
    // --------------------------------------------------------------------------
    // Authentication Token further validation.
    // Go to tokens.handler.js 
    //
    if(req.data) {

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

    } else {
        return res.status(405).json({message: 'Your authentication token is invalid'});
    }
};

// Get all areas
// exports.findAll = (req, res) => {
//     Area.findAll({
//         attributes: { exclude: ["createdAt", "updatedAt"] } // I m not sure if I want to remove it from req
//     })
//     .then(areas => {
//         //res.json(areas);
//         res.json({ areas: areas });
//     })
//     .catch(error => res.status(400).send(error))
// };

exports.findAll = (req, res) => {
    // --------------------------------------------------------------------------
    // Authentication Token further validation.
    // Go to tokens.handler.js 
    //
    if(req.data) {

        Area.findAll({
            include: [
                {
                    model: db.rollets
                },
                {
                    model: db.plugs
                }
            ],
            attributes: { exclude: ["createdAt", "updatedAt"] } // I m not sure if I want to remove it from req
        })
        .then(areas => {
            const resObj = areas.map(area => {

                return Object.assign(
                    {
                        areaId: area.id,
                        name: area.name,
                        areaState: area.areaState,
                        owner: area.owner,
                        // TODO: Would be good to have if statement and filted data depends on areaState...
                        devices: [
                            {
                                rollets: area.rollets.map(rollet => {

                                    return Object.assign(
                                        {
                                            name: rollet.name,
                                            type: rollet.type,
                                            powerState: rollet.powerState,
                                            actionState: rollet.actionState,
                                            topic: rollet.topic,
                                            areaId: rollet.areaId
                                        }
                                    )
                                })
                            },
                            {
                                plugs: area.plugs.map(plug => {
            
                                    return Object.assign(
                                        {
                                            name: plug.name,
                                            type: plug.type,
                                            powerState: plug.powerState,
                                            topic: plug.topic,
                                            areaId: plug.areaId
                                        }
                                    )
                                }),
                            }
                        ]
                    }
                )
            })
            res.json({areas: resObj})
        })
        .catch(error => res.status(400).send(error))

    } else {
        return res.status(405).json({message: 'Your authentication token is invalid'});
    }
};

// Find a Area by Id
exports.findById = (req, res) => {
    // --------------------------------------------------------------------------
    // Authentication Token further validation.
    // Go to tokens.handler.js 
    //
    if(req.data) {	

        Area.findById(req.params.areaId,
            {
                include: [
                    {
                        model: db.rollets,
                        required: false,
                    },
                    {
                        model: db.plugs,
                        required: false,
                    }
                ],
            },
            {attributes: { exclude: ["createdAt", "updatedAt"] }}
        )
        .then(area => {
            if (!area){
                return res.status(404).json({message: "Area Not Found"})
            }

            return res.status(200).json({area: area})
        })
        .catch(error => res.status(400).send(error));
    } else {
        return res.status(405).json({message: 'Your authentication token is invalid'});
    }
};

// Update an Area
exports.update = (req, res) => {
    // --------------------------------------------------------------------------
    // Authentication Token further validation.
    // Go to tokens.handler.js 
    //
    if(req.data) {

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
    } else {
        return res.status(405).json({message: 'Your authentication token is invalid'});
    }		 
};

// Delete an Area by Id
exports.delete = (req, res) => {
    // --------------------------------------------------------------------------
    // Authentication Token further validation.
    // Go to tokens.handler.js 
    //
    if(req.data) {

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
    } else {
        return res.status(405).json({message: 'Your authentication token is invalid'});
    }	
};