const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=d7684bc9ef73078d05cbdec8f76db170&query=' + latitude + ',' + longitude;

    request({url, json: true}, (error, { body }) =>{
        if(error){
            callback('Unable to connect to weather services! Please check your internet connection.', undefined);
        }else if(body.error){
            callback('Unable to find location!', undefined);
        }else{
            callback(undefined, {
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                description: body.weather_descriptions
            });
        }
    });
};

module.exports = forecast;