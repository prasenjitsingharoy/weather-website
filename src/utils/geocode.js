const request = require('request');

const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=8d667a4938bbc2cf6b727e55cffca751&query=${address}`;

    request({url , json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to location services! Please check your internet connection', undefined);
        }else if(body.error){
            callback('Invalid Query', undefined);
        }else{
            callback(undefined, {
                latitude: body.data[0].latitude, 
                longitude: body.data[0].longitude,
                place: body.data[0].label
            })
        }
    })
}

module.exports = geocode;