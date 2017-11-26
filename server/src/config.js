/**
 *  Obtain API key from system environment variable
 */
const APIKEY = process.env.APIKEY;

if (!APIKEY) {
  console.error('APIKEY environment variable missing. ' +
    'Please re-run with `APIKEY=<key> npm run server`');
  process.exit(1);
}
/**
 * The Base URL & API Key exporting to the config module
 */
module.exports = {
  apiKey: APIKEY,
  skyscannerApi: 'http://partners.api.skyscanner.net/'
};
