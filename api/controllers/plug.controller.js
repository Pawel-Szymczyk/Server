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
       // {attributes: { exclude: ["createdAt", "updatedAt"] }}
    )
    .then(plug => {
        if (!plug) {
            return res.status(404).json({message: "Plug Not Found"})
        }

        var state = this.convertStringInputToBooleanOutput(plug.powerState);
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
            timeStart: plug.timeStart,
            lastTime: getTurnOnPlugTime(plug.id, plug.timeStart, state),
            areaId: plug.areaId
        }

        return res.status(200).json(object)
    })
    .catch(error => res.status(400).send(error));
};


function getTurnOnPlugTime(id, start, state) {
    
    var time;

     if( state == true) {
        var stop = new Date();

        var res = Math.abs(start - stop) / 1000;


        // get hours        
        var hours = Math.floor(res / 3600) % 24;        
    // console.log("Difference (Hours): "+hours);  

        // get minutes
        var minutes = Math.floor(res / 60) % 60;
    // console.log("Difference (Minutes): "+minutes);  

        // get seconds
        var seconds = res % 60;
    // console.log("Difference (Seconds): "+seconds);  

        console.log(hours + ':' + minutes + ':' + seconds);
        
        
        
        time = hours + ':' + minutes + ':' + seconds;


    }

    return time;
    

}




// Update a plug base on mqtt state
exports.updateMqtt = (object) => {


    var tStart;

    if(object.powerState == "on") {
        tStart = new Date();
    } 


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
                //lastOnTime: date.getSeconds(), // to change
                timeStart: tStart,
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

exports.convertStringInputToBooleanOutput = (stringInput) => {
    var convertedState;
    if(stringInput == "on") {
        convertedState = true;
    } else {
        convertedState = false;
    }
 
    return convertedState;
}