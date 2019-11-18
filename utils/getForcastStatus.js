const request = require("request");

const getForcastStatus = (latitude, longitude, callback) => {
  const apiEndpoint = `https://api.darksky.net/forecast/d315b7e0f11d98a940bcb268e15fc3c5/${latitude},${longitude}?units=si`;
  let callbackError = undefined;

  request({
    url: apiEndpoint,
    json: true
  }, (error, response, body) => {
    if (error) {
      callbackError = `Unable to connect to Forecast service !`;
    }

    if (body.error) {
      callbackError = `Code: ${body.code}, Unable to find lat and long coordinate of the given address !`;
    }

    callback(
      callbackError,
      callbackError !== undefined
        ? undefined
        : `${body.daily.data[0].summary}. There's a ${body.currently.precipProbability} chance of rain`
    );
  })
};

module.exports = getForcastStatus;