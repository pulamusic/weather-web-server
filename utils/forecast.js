const request = require('request')

// Weather request
const forecast = (latitude, longitude, callback) => {
  const weatherKey = 'ce32d589199f476539c442789d50487a'
  const weatherURL = `https://api.darksky.net/forecast/${weatherKey}/${longitude},${latitude}`

  request({url: weatherURL, json: true}, (error, { body }) => {
    const temperature = body.currently.temperature
    const precipitation = body.currently.precipProbability * 100

    if (error) {
      callback('Unable to connect to the weather service.', undefined)
    } else if (body.error) {
      callback('Unable to find that location. Please try another search.', undefined)
    } else {
      callback(undefined, `${body.daily.data[0].summary} It is currently ${temperature} degrees out. There is a ${precipitation}% chance of precipitation.`)
    }
  })
}

module.exports = forecast
