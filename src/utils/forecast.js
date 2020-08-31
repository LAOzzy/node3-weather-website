const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7bfddb31e1b56dd605524cb9f1610de4&query='+ encodeURIComponent(longitude)+','+ encodeURIComponent(latitude) +'&units=f'

    request({url, json:true}, (error, {body} = {}) =>{ 
        if(error){
            console.log(body.error.type+":"+body.error.info, undefined)
        } else{
            callback(undefined, {
                current_temp : body.current.temperature,
                feels_like_temp : body.current.feelslike,
                description : body.current.weather_descriptions[0]
            })
        }
    })
 }

 module.exports = forecast