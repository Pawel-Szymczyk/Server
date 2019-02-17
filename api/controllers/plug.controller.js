'use strict';

const pConsumption = require('../middleware/powerConsumption');

const db = require('../config/db.config');
const Plug = db.plugs;

// Post a plug
exports.create = (req, res) => {

    // --------------------------------------------------------------------------
    // Authentication Token further validation.
    // Go to tokens.handler.js
    //
    if(req.data) {

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

    } else {
        return res.status(405).json({message: 'Your authentication token is invalid'});
    }
};




// Find a Plug by Id
exports.findById = (req, res) => {
    // --------------------------------------------------------------------------
    // Authentication Token further validation.
    // Go to tokens.handler.js
    //
    if(req.data) {

        Plug.findById(req.params.plugId,
        // {attributes: { exclude: ["createdAt", "updatedAt"] }}
        )
        .then(plug => {
            if (!plug) {
                return res.status(404).json({message: "Plug Not Found"})
            }

            var state = this.convertStringInputToBooleanOutput(plug.powerState);
            console.log("power state: " + state);
            // getTurnOnPlugTime(plug.timeStart, plug.timeStop);

            // getTurnOnPlugTime(plug.id, plug.timeStart, state);

            // if(state == false) {
            //     console.log( plug.timeStop );
            // }


            var object = {
                id: plug.id,
                name: plug.name,
                type: plug.type,
                powerState: state,
                serialNumber: plug.serialNumber,
                topic: plug.topic,
                createdAt: plug.createdAt,
                updatedAt: plug.updatedAt,
                //timeStart: plug.timeStart,
                //lastTime: pConsumption.getTurnOnPlugTime(plug.id, plug.updatedAt, state),
                areaId: plug.areaId
            }

            return res.status(200).json(object)
        })
        .catch(error => res.status(400).send(error));

    } else {
        return res.status(405).json({message: 'Your authentication token is invalid'});
    }
};


var objOn;
var objOff;


// Update a plug base on mqtt state
exports.updateMqttDB = (object) => {

    
    
    // let objOn = new Date();
    // let objOff = new Date();
    // let totalOn = new Date();
    // objOn.setHours(0,0,0,0);
    // objOff.setHours(0,0,0,0);
    // totalOn.setHours(0,0,0,0);

  //  console.log(objOn.getTime(), objOff.getTime(), totalOn.getTime());

    // var tStart;

    // if(object.powerState == "on") {
    //     tStart = new Date();
    // }


	return Plug.findById(object.plugId)
		.then(plug => {
            if(!plug){
                return res.status(404).json({
                    message: 'Plug Not Found',
                });
            }
            console.log("CreatedAt: " + plug.createdAt);

            
            if(object.powerState == "on") {
                objOn = pConsumption.returnSwitchOnOff();
                console.log("switch ON: " + objOn);
            }

            if(object.powerState == "off") {
                objOff = pConsumption.returnSwitchOnOff();
                console.log("switch OFF: " + objOff);
            }
            //console.log("switch OFF !!: " + objOff);

            let overallTotal = pConsumption.returnOverallTotal(new Date(), plug.createdAt);
            console.log("overall time: " + overallTotal);


            

            if(object.powerState == "on") {
                
                console.log("return Total Off: " + returnTotalOff);
            }

            if(object.powerState == "off") {

            }


            // let totalOn;
            // if(totalOn == null) {
            //     totalOn = 0;
            // }
            // let returnTotalOn = pConsumption.returnTotalOn(totalOn.getTime(), objOff.getTime(), objOn.getTime());
            // console.log("returnTotalOn time: " + returnTotalOn);


            // return plug.update({
            //     name: object.name,
            //     type: object.type,
            //     powerState: object.powerState,
            //     serialNumber: object.serialNumber,
            //     topic: object.topic,
            //     //lastOnTime: date.getSeconds(), // to change
            //     //timeStart: tStart,
            //     areaId: object.areaId
            // })
            // .then(() => res.status(200).json(plug))
            // .catch((error) => res.status(400).send(error));
        })
		.catch((error) => res.status(400).send(error));
};

// Delete a plug by Id
exports.delete = (req, res) => {
    // --------------------------------------------------------------------------
    // Authentication Token further validation.
    // Go to tokens.handler.js
    //
    if(req.data) {

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

    } else {
        return res.status(405).json({message: 'Your authentication token is invalid'});
    }
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

exports.convertStringInputToBooleanOutput = (stringInput) => {
    var convertedState;
    if(stringInput == "on") {
        convertedState = true;
    } else {
        convertedState = false;
    }

    return convertedState;
}