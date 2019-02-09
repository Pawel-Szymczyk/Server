module.exports = {

    errorFormatter: ({location, msg, param, value, nestedErrors}) => {
        return {
            type: "Error",
            name: "Signup Failure",
            location: location,
            message: msg,
            param: param,
            value: value,
            nestedErrors: nestedErrors,
        }
    }
}