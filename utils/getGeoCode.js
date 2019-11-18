const request = require("request");

const getGeoCode = (address, callback) => {
  const apiEndpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaHVucS12dXgiLCJhIjoiY2sxNmtiank2MTZxbjNpbnpvODZsbTExYiJ9.eM5ZJqzgImpiFxa7y36C8g&limit=1`;
  let callbackError = undefined;

  request({
    url: apiEndpoint,
    json: true
  }, (error, response, body) => {
    if (error) {
      callbackError = `Unable to connect to Geographic service !`;
    }

    if (body.error) {
      callbackError = `Code: ${body.code}, Unable to find lat and long coordinate of the given address !`;
    }

    if (body.features.length === 0) {
      callbackError = `Found no coord of the given address !`;
    }

    callback(
      callbackError,
      callbackError !== undefined
        ? undefined
        : {
          lat: body.features[0].center[1],
          long: body.features[0].center[0],
          location: body.features[0].place_name
        });
  })
};

module.exports = getGeoCode;