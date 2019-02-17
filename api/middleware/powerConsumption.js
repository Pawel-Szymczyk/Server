'use strict';

exports.getTurnOnPlugTime = (id, start, state) => {
    
    var time;
    if( state == true) {
        var stop = new Date();
        var res = Math.abs(start - stop) / 1000;

        // get hours        
        var hours = Math.floor(res / 3600) % 24;   

        // get minutes
        var minutes = Math.floor(res / 60) % 60; 

        // get seconds
        var seconds = res % 60;  

        console.log(hours + ':' + minutes + ':' + seconds);
        time = hours + ':' + minutes + ':' + seconds;
    }
    return time;

};

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds;
  }

exports.getOnTime = () => {

};

exports.getOffTime = () => {

};


// --------------------------------------------------------------
// Use these methods only when update
//


exports.returnSwitchOnOff = () => {

    return new Date();
};

exports.returnOverallTotal = (now, createdAt) => {
    // let now = new Date();

    // console.log("NOW: " + now.toUTCString());
    // console.log("CREATED: " + createdAt.toUTCString());
    let total = now - createdAt;
    let convertedTime = msToTime(total);
    return convertedTime;
};

exports.returnTotalOn = (totalOn, switchOff, switchOn) => {
    // console.log(totalOn);
    // console.log(switchOff);
    // console.log(switchOn);


    totalOn = totalOn + (switchOff - switchOn);
    let convertedTime = msToTime(totalOn);
    return convertedTime;
};

exports.returnTotalOff = (totalOff, switchOff, switchOn) => {
    totalOff = totalOff + (switchOn - switchOff);
    let convertedTime = msToTime(totalOff);
    return convertedTime;
};


// --------------------------------------------------------------
