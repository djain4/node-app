const request = require('request');

const geocode = (address, callback) => {
    const url = "http://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZGhhdmFsamphaW4iLCJhIjoiY2s2Nmk2ZnVtMHd5dzNkb2RqY3RjZnR0NSJ9.4NEeV5IGCliSjkrfEZCV_g"

    // request({url: url, json: true}, (error, response) => {
    request({url, json: true}, (error, {body}) => {
        console.log(error);
        console.log(1);

        if(error) {
            callback("Unable to connect to the location services", undefined)
        }
        else if(body.features.length == 0) {
            callback("Unable to find location, try different server", undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
};

module.exports = geocode;