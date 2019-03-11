'use strict';

const db = require('../config/db.config');
const RGB = db.rgbs; 

// Post a rgb
exports.create = (req, res) => {	
    // --------------------------------------------------------------------------
    // Authentication Token further validation.
    // Go to tokens.handler.js 
    //
    if(req.data) {

        // Save to MariaDB database
        RGB.create({  
            name: req.body.name,
            type: req.body.type,
            powerState: req.body.powerState,
            serialNumber: req.body.serialNumber,
            hue: req.body.hue,
            saturation: req.body.saturation,
            value: req.body.value,
            brightness: req.body.brightness,
            option: req.body.option,
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

        RGB.findById(req.params.rgbId,
            {attributes: { exclude: ["createdAt", "updatedAt"] }}
        )
        .then(rgb => {
            if (!rgb){
                return res.status(404).json({message: "RGB Light Not Found"})
            }

            return res.status(200).json(rgb)
        })
        .catch(error => res.status(400).send(error));
        
    } else {
        return res.status(405).json({message: 'Your authentication token is invalid'});
    }
};

// Update a rgb
exports.update = (req, res) => {
    // --------------------------------------------------------------------------
    // Authentication Token further validation.
    // Go to tokens.handler.js 
    //
    if(req.data) {

        return RGB.findById(req.params.rgbId)
            .then(rgb => {
                if(!rgb){
                    return res.status(404).json({
                        message: 'RGB Not Found',
                    });
                }
                return rgb.update({
                    name: req.body.name,
                    type: req.body.type,
                    powerState: req.body.powerState,
                    serialNumber: req.body.serialNumber,
                    hue: req.body.hue,
                    saturation: req.body.saturation,
                    value: req.body.value,
                    brightness: req.body.brightness,
                    option: req.body.option,
                    topic: req.body.topic,
                    areaId: req.body.areaId
                })
                .then(() => res.status(200).json(rgb))
                .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));			 
        
    } else {
        return res.status(405).json({message: 'Your authentication token is invalid'});
    }
};

// Delete a rgb by Id
exports.delete = (req, res) => {
    // --------------------------------------------------------------------------
    // Authentication Token further validation.
    // Go to tokens.handler.js 
    //
    if(req.data) {

        return RGB
            .findById(req.params.rgbId)
            .then(rgb => {
                if(!rgb) {
                    return res.status(400).send({
                        message: 'RGB Light Not Found',
                    });
                }
    
                return rgb.destroy()
                .then(() => res.status(200).json({message: "RGB light removed successfully!"}))
                .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    } else {
        return res.status(405).json({message: 'Your authentication token is invalid'});
    }
};
