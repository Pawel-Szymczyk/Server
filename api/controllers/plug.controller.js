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
            powerState: this.convertBoolInputToStringOutput(req.body.powerState),
            serialNumber: req.body.serialNumber,
            topic: req.body.topic,
            switch_ON: new Date().setHours(0,0,0,0),
            switch_OFF: new Date(),
            overallTotal: '0:0:0:0',
            total_ON: '0:0:0:0',
            total_OFF: '0:0:0:0',
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



// Update a plug base on mqtt state
exports.updateMqttDB = (object) => {
    

	return Plug.findById(object.plugId)
		.then(plug => {
            if(!plug){
                return res.status(404).json({
                    message: 'Plug Not Found',
                });
            }

            let overallTime = pConsumption.returnOverallTotal(new Date(), plug.createdAt);
            
            // if(object.powerState == "on") {
            //     objOn = pConsumption.returnSwitchOnOff();
            //     objOff = plug.switch_OFF;

            // //    console.log("objOn: " + objOn);
            // //    console.log("objOff: " + objOff);

            //    //console.log("total time off: " + plug.total_OFF);
            //     totalTime_Off = pConsumption.returnTotalTimeOff(plug);
               
            // //    console.log("total time off: " + totalTime_Off);

            // } 

            // if((object.powerState == "off")) {
            //     objOn = plug.switch_ON;
            //     objOff = pConsumption.returnSwitchOnOff();

            //   //console.log("total time on: " + plug.total_ON)

            //     totalTime_On = pConsumption.returnTotalTimeOn(plug);

            // //   console.log("total time on: " + totalTime_On);

            // }

          
            return plug.update({
                name: object.name,
                type: object.type,
                powerState: object.powerState,
                serialNumber: object.serialNumber,
                topic: object.topic,
                // switch_ON: objOn,
                // switch_OFF: objOff,
                // overallTotal: overallTime,
                // total_OFF: totalTime_Off,
                // total_ON: totalTime_On,
                areaId: object.areaId
            })
            //.then(() => res.status(200).json(plug)) // do not return anything
            .catch((error) => res.status(400).send(error));
        })
		.catch(error => res.status(400).send(error));
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