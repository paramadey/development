require('isomorphic-fetch');
require('es6-promise').polyfill();
const UtilityClass = require("./api/UtilityClass.js");
const express = require('express');
const app = express();
const api = require('./api/');
const request = require('request');
let requestCurrency=null;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

/**
  Simple flight search api wrapper.

  TODO: client should provide params

  Api params and location values are here:
  http://business.skyscanner.net/portal/en-GB/Documentation/FlightsLivePricingQuickStart
*/
app.get('/api/search', (req, res) => {
  var baseUrl='http://partners.api.skyscanner.net/apiservices/pricing/v1.0';
  var parameters = constructRequestParameters(req);
  parameters = JSON.parse(parameters);
  api.livePricing.search({
    parameters
  
  })
  .then((results) => {
    // TODO - a better format for displaying results to the client
    console.log('TODO: transform results for consumption by client');
    ;

    res.send(constructFlightList(results));
  })
  .catch(console.error);
});
function constructRequestParameters(req){
   console.log('req params from client  = '+JSON.stringify(req.params));
   let country = req.param('country');
   requestCurrency = req.param('currency');
   let flightClass = req.param('class');
   let locale = req.param('locale');
   let locationSchema = req.param('locationSchema');
   let fromPlace = req.param('fromPlace');
   let toPlace = req.param('toPlace');
   let fromDate = req.param('fromDate');
   let toDate = req.param('toDate');
   let adults = req.param('adults');
   let infants = req.param('infants');
   let apiKey = req.param('apiKey');
   
   requestCurrency='GBP';
  let requestObj = '{"country": "'+country+'","currency":"GBP","class":"Economy","locale":"en-GB","locationSchema":"iata","fromPlace":"EDI","toPlace":"LHR","fromDate":"2018-01-01","toDate":"2018-01-02","adults":1,"children":0,"infants":0}';
  let customRequestObj = '{"country": "'+country+'","currency":"'+requestCurrency+'","class":"'+flightClass+'","locale":"'+locale
   +'","locationSchema":"'+locationSchema+'","fromPlace":"'+fromPlace+'","toPlace":"'+toPlace+'","fromDate":"'+fromDate
   +'","'+toDate+'":"2017-12-02","adults":'+adults+',"children":0,"infants":'+infants+',"apiKey":"'+apiKey+'"}';
 //  console.log('customRequestObj = '+customRequestObj);
   return requestObj;
}
app.listen(4000, () => {
  console.log('Node server listening on http://localhost:4000');
});
function constructFlightList(response){
  var flightList = [];
  var utilityClassObject = new  UtilityClass (response.Itineraries,response.Legs,response.Agents,response.Currencies,requestCurrency,response.Places);
  var joinedArr = utilityClassObject.joinItinerariesWithLegs();
  //console.log('joinedArr first object = '+JSON.stringify(joinedArr[0]));
  console.log('joinedArr length = '+joinedArr.length);
  console.log('joinedArr object sample = '+JSON.stringify(joinedArr[0]));
  return joinedArr;
}
