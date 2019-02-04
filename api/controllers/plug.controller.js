'use strict';

const db = require('../config/db.config');
const Plug = db.plugs;

// Post a plug
exports.create = (req, res) => {
    
    
	// Save to MariaDB database
    Plug.create({  
        name: req.body.name,
        type: req.body.type,
        // powerState: req.body.powerState,
        powerState: this.convertBoolInputToStringOutput(req.body.powerState),
        serialNumber: req.body.serialNumber,
        topic: req.body.topic,
        areaId: req.body.areaId
	})
    .then(plug => {		
        // Send created device to client
        res.json(plug);
    })
    .catch(error => res.status(400).send(error))
};

// Find a Plug by Id
exports.findById = (req, res) => {	
    Plug.findById(req.params.plugId,
        {attributes: { exclude: ["createdAt", "updatedAt"] }}
    )
    .then(plug => {
        if (!plug) {
            return res.status(404).json({message: "Plug Not Found"})
        }

        var object = {
            id: plug.id,
            name: plug.name,
            type: plug.type,
            powerState: convertStringInputToBooleanOutput(plug.powerState),
            serialNumber: plug.serialNumber,
            topic: plug.topic,
            areaId: plug.areaId
        }

        return res.status(200).json(object)
    })
    .catch(error => res.status(400).send(error));
};

// Update a plug
// exports.update = (req, res) => {
    
// 	return Plug.findById(req.params.plugId)
// 		.then(plug => {
//             if(!plug){
//                 return res.status(404).json({
//                     message: 'Plug Not Found',
//                 });
//             }
//             return plug.update({
//                 name: req.body.name,
//                 type: req.body.type,
//                 powerState: req.body.powerState,
//                 serialNumber: req.body.serialNumber,
//                 topic: req.body.topic,
//                 areaId: req.body.areaId
//             })
//             .then(() => res.status(200).json(plug))
//             .catch((error) => res.status(400).send(error));
//         })
// 		.catch((error) => res.status(400).send(error));			 
// };

// Update a plug base on mqtt state
exports.updateMqtt = (object) => {


	return Plug.findById(object.plugId)
		.then(plug => {
            if(!plug){
                return res.status(404).json({
                    message: 'Plug Not Found',
                });
            }
            return plug.update({
                name: object.name,
                type: object.type,
                powerState: object.powerState,
                serialNumber: object.serialNumber,
                topic: object.topic,
                areaId: object.areaId
            })
            // .then(() => res.status(200).json(plug))
            // .catch((error) => res.status(400).send(error));
        })
		.catch((error) => res.status(400).send(error));			 
};

// Delete a plug by Id
exports.delete = (req, res) => {
	return Plug
        .findById(req.params.plugId)
        .then(plug => {
            if(!plug) {
                return res.status(400).send({
                    message: 'Plug Not Found',
                });
            }
 
            return plug.destroy()
            .then(() => res.status(200).json({message: "Plug removed successfully!"}))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
};



exports.convertBoolInputToStringOutput = (boolInput) => {
    var convertedState;
    if(boolInput == true) {
        convertedState = "on";
    } else {
        convertedState = "off";
    }
 
    return convertedState;
}

function convertStringInputToBooleanOutput(stringInput) {
    var convertedState;
    if(stringInput == "on") {
        convertedState = true;
    } else {
        convertedState = false;
    }
 
    return convertedState;
}