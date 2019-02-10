'use strict';

const db = require('../config/db.config');
const Rollet = db.rollets; 

// Post a rollet
exports.create = (req, res) => {	
    // --------------------------------------------------------------------------
    // Authentication Token further validation.
    // Go to tokens.handler.js 
    //
    if(req.data) {

        // Save to MariaDB database
        Rollet.create({  
            name: req.body.name,
            type: req.body.type,
            powerState: req.body.powerState,
            actionState: req.body.actionState,
            topic: req.body.topic,
            areaId: req.body.areaId
        })
        .then(device => {		
            // Send created device to client
            res.json(device);
        })
        .catch(error => res.status(400).send(error))

    } else {
        return res.status(405).json({message: 'Your authentication token is invalid'});
    }
};

// Find a Rollet by Id
exports.findById = (req, res) => {	
    // --------------------------------------------------------------------------
    // Authentication Token further validation.
    // Go to tokens.handler.js 
    //
    if(req.data) {

        Rollet.findById(req.params.rolletId,
            {attributes: { exclude: ["createdAt", "updatedAt"] }}
        )
        .then(rollet => {
            if (!rollet){
                return res.status(404).json({message: "Rollet Not Found"})
            }

            return res.status(200).json(rollet)
        })
        .catch(error => res.status(400).send(error));
        
    } else {
        return res.status(405).json({message: 'Your authentication token is invalid'});
    }
};

// Update a rollet
exports.update = (req, res) => {
    // --------------------------------------------------------------------------
    // Authentication Token further validation.
    // Go to tokens.handler.js 
    //
    if(req.data) {

        return Rollet.findById(req.params.rolletId)
            .then(rollet => {
                if(!rollet){
                    return res.status(404).json({
                        message: 'Rollet Not Found',
                    });
                }
                return rollet.update({
                    name: req.body.name,
                    type: req.body.type,
                    powerState: req.body.powerState,
                    actionState: req.body.actionState,
                    topic: req.body.topic,
                    areaId: req.body.areaId
                })
                .then(() => res.status(200).json(rollet))
                .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));			 
        
    } else {
        return res.status(405).json({message: 'Your authentication token is invalid'});
    }
};

// Delete a rollet by Id
exports.delete = (req, res) => {
    // --------------------------------------------------------------------------
    // Authentication Token further validation.
    // Go to tokens.handler.js 
    //
    if(req.data) {

        return Rollet
            .findById(req.params.rolletId)
            .then(rollet => {
                if(!rollet) {
                    return res.status(400).send({
                        message: 'Rollet Not Found',
                    });
                }
    
                return rollet.destroy()
                .then(() => res.status(200).json({message: "Rollet removed successfully!"}))
                .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    } else {
        return res.status(405).json({message: 'Your authentication token is invalid'});
    }
};


exports.changeRolletPosition = () => {
    
    // save to database...
    console.log("controller here");

};