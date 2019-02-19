'use strict';
var moment = require('moment');



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
    // ----------------------------------------------------------------------
    // Calculate the total time difference in miliseconds and return in d:h:m:s format
    //
    let total = now - createdAt;
    let convertedTime = convert_ms_to_dms(total);
    return convertedTime;
};

exports.returnTotalTimeOn = (plug) => {
    console.log('ON');
    // ----------------------------------------------------------------------
    // Get total time on and convert to miliseconds
    //
    let total_on = plug.total_ON; // dd:hh:mm:ss
    var total_on_array = total_on.split(':');
    var total_on_ms = miliseconds(total_on_array[0],total_on_array[1],total_on_array[2],total_on_array[3]);
    //console.log(total_on_ms);
    // ----------------------------------------------------------------------
    // Get the difference in time between switch off and on
    //
    let diff_off_on = (plug.switch_ON - plug.switch_OFF);
    //console.log(diff_off_on);
    // ----------------------------------------------------------------------
    // Add both results in milliseconds
    //
    let total_ms = total_on_ms + diff_off_on;
    //console.log(total_ms);
    // ----------------------------------------------------------------------
    // Convert back to d:h:m:s format and return it
    //
    return convert_ms_to_dms(total_ms);

};

exports.returnTotalTimeOff = (plug) => {
    console.log(plug);

     if(plug.total_OFF == '0:0:0:0') {
        // ----------------------------------------------------------------------
        // Calculate the time difference in miliseconds and return in d:h:m:s format
        //
        // console.log('0:0:0:0');
        // console.log(plug.createdAt);
        // console.log(plug.switch_ON);
        let diff_on_off = (plug.switch_ON - plug.createdAt);
        //console.log(diff_on_off);
        return convert_ms_to_dms(diff_on_off); //this is ok
     } else {
        console.log('not 0:0:0:0');
        // ----------------------------------------------------------------------
        // Get total time off and convert to miliseconds
        //
        let total_off = plug.total_OFF; // dd:hh:mm:ss
        var total_off_array = total_off.split(':');
        var total_off_ms = miliseconds(total_off_array[0],total_off_array[1],total_off_array[2],total_off_array[3]);

        // ----------------------------------------------------------------------
        // Get the difference in time between switch on and off in milliseconds
        //
        let diff_on_off = (plug.switch_ON - plug.switch_OFF); //must be in milliseconds
        //console.log(diff_on_off);

        // ----------------------------------------------------------------------
        // Add both results in milliseconds
        //
        let total_ms = total_off_ms + diff_on_off;

        // ----------------------------------------------------------------------
        // Convert back to d:h:m:s format and return it
        //
        return convert_ms_to_dms(total_ms);
    }
   
};


function miliseconds(days,hrs,min,sec)
{
    return((days*60*60*24+hrs*60*60+min*60+sec)*1000);
}

function convert_ms_to_dms(milliseconds) {
    var diff = new moment.duration(milliseconds);
    var d = diff.days();     // # of days in the duration
    var h = diff.hours();    // # of hours in the duration
    var m = diff.minutes();  // # of minutes in the duration
    var s = diff.seconds();

    return d + ":" + h + ":" + m + ":" + s;
}



// --------------------------------------------------------------
// function addHours(hour1, hour2) {
//     var h1 = moment.duration(hour1, 'h');
//     var h2 = moment.duration(hour2, 'h');
//     return h1.add(h2).hours();
// }

// function addMinutes(min1, min2) {
//     var m1 = moment.duration(min1, 'm');
//     var m2 = moment.duration(min2, 'm');
//     return m1.add(m2).minutes();
// }

// function addSeconds(sec1, sec2) {
//     var s1 = moment.duration(sec1, 's');
//     var s2 = moment.duration(sec2, 's');
//     return s1.add(s2).seconds();
// }

// function convertToSeconds(time) {
//     var seconds = moment.duration(time).asSeconds();
//     return seconds;
// }

// function msToTime(duration) {
//     var milliseconds = parseInt((duration % 1000) / 100),
//       seconds = parseInt((duration / 1000) % 60),
//       minutes = parseInt((duration / (1000 * 60)) % 60),
//       hours = parseInt((duration / (1000 * 60 * 60)) % 24),
//       days = parseInt( (duration / (1000 * 60 * 60)) * 24 );
  

//     hours = (hours < 10) ? "0" + hours : hours;
//     minutes = (minutes < 10) ? "0" + minutes : minutes;
//     seconds = (seconds < 10) ? "0" + seconds : seconds;
  
//     return hours + ":" + minutes + ":" + seconds;
// }

    // function secondsToDhms(seconds) {
    //     seconds = Number(seconds);
//     var d = Math.floor(seconds / (3600*24));
//     var h = Math.floor(seconds % (3600*24) / 3600);
//     var m = Math.floor(seconds % 3600 / 60);
//     var s = Math.floor(seconds % 3600 % 60);
    
//     // var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
//     // var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
//     // var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
//     // var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
//     var dDisplay = d > 0 ? d + (d == 1 ? ":" : ":") : "";
//     var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
//     var mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "";
//     var sDisplay = s > 0 ? s + (s == 1 ) : "";
//     return dDisplay + hDisplay + mDisplay + sDisplay;
// }