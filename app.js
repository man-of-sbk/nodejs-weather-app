const request = require("request");
const chalk = require("chalk");
const yargs = require("yargs");

const getGeoCode = require("./utils/getGeoCode");
const getForcastStatus = require("./utils/getForcastStatus");

const dangerLog = arg => console.log(chalk.red.inverse(arg));

console.log(yargs.argv);

const getForecastInforHandler = (locationName) => {
  getGeoCode(locationName, (geoErr, geoData) => {
    if (geoErr !== undefined) {
      dangerLog(geoErr);
      return;
    }

    getForcastStatus(geoData.lat, geoData.long, (forcastErr, forcaseData) => {
      if (forcastErr !== undefined) {
        dangerLog(forcastErr);
        return;
      }

      console.log(forcaseData);
    });
  });
}

yargs.command({
  command: "getForcastInfo",
  description: "get forecast infor via a given location name",
  builder: {
    locationName: {
      description: "a location name",
      demandOption: true,
      type: "string",
      // default: "Ha Noi"
    }
  },
  handler: (argv) => {
    getForecastInforHandler(argv.locationName);
  }
}).argv;
