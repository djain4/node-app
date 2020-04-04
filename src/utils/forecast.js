const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/51ba5ade6ae11a6ad02e6778dd340550/" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude);

    // request({url: url, json: true}, (error, response) => {  //// Earlier before destructring
    request({url, json: true}, (error, { body }) => {
    // const data = JSON.parse(response.body);

        if(error) {
            callback("Error", undefined)
        } else if(body.error) {
            callback("unable to fin location", undefined)
        } else {
            console.log(body)
            callback(undefined, body.daily.data[0].summary + "Its is currently " + body.currently.temperature + " degrees out. There is " + body.currently.precipProbability + " chance of rain");
        }
    });
};

module.exports = forecast;