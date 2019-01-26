const db = require('../config/db.config');
const Device = db.devices;

// Post a Device
exports.create = (req, res) => {	
	// Save to MariaDB database
	Device.create({  
        name: req.body.name,
        powerState: req.body.powerState,
        deviceActionState: req.body.deviceActionState,
        topic: req.body.topic,
	})
    .then(device => {		
        // Send created device to client
        res.json(device);
    })
    .catch(error => res.status(400).send(error))
};

// Get all devices
exports.findAll = (req, res) => {
    Device.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] } // I m not sure if I want to remove it from req
    })
    .then(devices => {
        res.json(devices);
    })
    .catch(error => res.status(400).send(error))
};

// Find a device by Id
exports.findById = (req, res) => {	
	Device.findById(req.params.deviceId,
        {attributes: { exclude: ["createdAt", "updatedAt"] }}
    )
    .then(device => {
        if (!device){
            return res.status(404).json({message: "Device Not Found"})
        }

        return res.status(200).json(device)
    })
    .catch(error => res.status(400).send(error));
};

// Update a device
exports.update = (req, res) => {
	return Device.findById(req.params.deviceId)
		.then(device => {
            if(!device){
                return res.status(404).json({
                    message: 'Device Not Found',
                });
            }
            return device.update({
                name: req.body.name,
                powerState: req.body.powerState,
                deviceActionState: req.body.deviceActionState,
                topic: req.body.topic,
            })
            .then(() => res.status(200).json(device))
            .catch((error) => res.status(400).send(error));
        })
		.catch((error) => res.status(400).send(error));			 
};

// Delete a device by Id
exports.delete = (req, res) => {
	return Device
        .findById(req.params.deviceId)
        .then(device => {
            if(!device) {
                return res.status(400).send({
                    message: 'Device Not Found',
                });
            }
 
            return device.destroy()
            .then(() => res.status(200).json({message: "Device removed successfully!"}))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
};