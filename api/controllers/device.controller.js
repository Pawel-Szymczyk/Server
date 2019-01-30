const db = require('../config/db.config');
const Device = db.devices;

const Rollet = db.rollets;
const Plug = db.plugs;

// Post a Device
exports.create = (req, res) => {	
    // Save to MariaDB database
    let deviceType = req.params.deviceType;

    switch (deviceType) {
        case "rollet":
            createRolletDevice(req, res);
            break;
        case "plug":
            createPlugDevice(req, res);
            break;
        case "temp":
            createTemperatureDevice(req, res);
            break;
        case "light":
            createLightDevice(req, res);
            break;
        case "motion":
            createMotionDevice(req, res);
            break;
        case "camera":
            createCameraDevice(req, res);
            break;
        case "rgb":
            createRGBDevice(req, res);
            break;
        default:
            break;
    }
};

function createRolletDevice(req, res) {
    Rollet.create({  
        name: req.body.name,
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
}

function createPlugDevice(req, res) {
    Plug.create({  
        name: req.body.name,
        powerState: req.body.powerState,
        topic: req.body.topic,
        areaId: req.body.areaId
	})
    .then(device => {		
        // Send created device to client
        res.json(device);
    })
    .catch(error => res.status(400).send(error))
}

function createTemperatureDevice(req, res) {

}

function createLightDevice(req, res) {

}

function createMotionDevice(req, res) {

}

function createCameraDevice(req, res) {

}

function createRGBDevice(req, res) {

}

// Get all devices
// exports.findAll = (req, res) => {
//     Device.findAll({
//         attributes: { exclude: ["createdAt", "updatedAt"] }, // I m not sure if I want to remove it from req#
//         where: {areaId: req.query.areaId }
//     })
//     .then(devices => {
//         res.json({devices: devices});
//     })
//     .catch(error => res.status(400).send(error))
// };



// exports.findAll = (req, res) => {
//     Device.findAll({
//         include: [
//             {
//                 model: Rollets
//             },
//             {
//                 model: Plugs
//             }
//         ],
//         where: {areaId: req.query.areaId }
//     })
//     .then(devices => {
//         const resObj = devices.map(device => {

//             return Object.assign(
//                 {},
//                 {
//                     // name: device.name,
//                     // powerState: device.powerState,
//                     // topic: device.topic,
//                     // areaId: device.areaId,
//                     rollet: device.rollets.map(rollet => {

//                         return Object.assign(
//                             {},
//                             {
//                                 actionState: rollet.actionState,
//                                 deviceId: rollet.deviceId
//                             }
//                         )
//                     }),
//                     plug: device.plugs.map(plug => {

//                         return Object.assign(
//                             {},
//                             {
//                                 actionState: plug.actionState,
//                                 deviceId: plug.deviceId
//                             }
//                         )
//                     }),
//                 }
//             )
            
//         })

//         res.json({devices: resObj})
//     })
//     .catch(error => res.status(400).send(error))
// };

// Find a device by Id
// exports.findById = (req, res) => {	
// 	Device.findById(req.params.deviceId,
//         {attributes: { exclude: ["createdAt", "updatedAt"] }}
//     )
//     .then(device => {
//         if (!device){
//             return res.status(404).json({message: "Device Not Found"})
//         }

//         return res.status(200).json(device)
//     })
//     .catch(error => res.status(400).send(error));
// };

// // Update a device
// exports.update = (req, res) => {
// 	return Device.findById(req.params.deviceId)
// 		.then(device => {
//             if(!device){
//                 return res.status(404).json({
//                     message: 'Device Not Found',
//                 });
//             }
//             return device.update({
//                 name: req.body.name,
//                 powerState: req.body.powerState,
//                 deviceActionState: req.body.deviceActionState,
//                 topic: req.body.topic,
//                 areaId: req.body.areaId,
//             })
//             .then(() => res.status(200).json(device))
//             .catch((error) => res.status(400).send(error));
//         })
// 		.catch((error) => res.status(400).send(error));			 
// };

// // Delete a device by Id
// exports.delete = (req, res) => {
// 	return Device
//         .findById(req.params.deviceId)
//         .then(device => {
//             if(!device) {
//                 return res.status(400).send({
//                     message: 'Device Not Found',
//                 });
//             }
 
//             return device.destroy()
//             .then(() => res.status(200).json({message: "Device removed successfully!"}))
//             .catch(error => res.status(400).send(error));
//         })
//         .catch(error => res.status(400).send(error));
// };