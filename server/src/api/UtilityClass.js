const FlightDetailModel = require("./FlightDetailModel.js");
const Itineraries = require("./Itineraries.js");
const LegsModel = require("./LegsModel.js");
const Agent = require("./Agent.js");
const Currency = require("./Currency.js");
const Place = require("./Place.js");
const lodash = require('lodash');
class UtilityClass{
   
    constructor(itineraries,legs,agents,currencies,requestCurrency,places){
        let legObj= new LegsModel();
        let itineraryObj = new Itineraries();
        let utilityAgentObj = new Agent();
        let currencyObj = new Currency();
        let placeObj = new Place();
        this.itineraries=itineraryObj.fromJson(itineraries);//send json array and get object array
        this.legs=legObj.fromJson(legs);
        this.agents=utilityAgentObj.fromJson(agents);
        this.flightDetailModel = new FlightDetailModel();
        this.currencies = currencyObj.fromJson(currencies);
        this.requestCurrency=requestCurrency;
        this.places=placeObj.fromJson(places);
    }
    getItineraries() {
        return this.itineraries;
    }
    getLegs() {
        return this.legs;
    }
    getAgents() {
        return this.agents;
    }
    setAgents(agents) {
        this.agents=agents;
    }
    getFlightDetailsModel(){
        return this.flightDetailModel;
    }
    getCurrencies(){
        return this.currencies;
    }
    getRequestCurrency(){
        return this.requestCurrency;
    }
    getPlaces(){
        return this.places;
    }
    /**
     * This function will merge Itineraries & Legs.
     */
    joinItinerariesWithLegs(){
        console.log('Inside joinItinerariesWithLegs, Itineraries count : '+this.getItineraries().length+' and legs count : '+this.getLegs().length);
     
        let mappedOutboundLegObj={},mappedInboundLegObj={},flightDetailObj={};
        let flightDetailsList=[];
  
        for (var itineryObj of this.getItineraries()) {
        
            flightDetailObj = new FlightDetailModel();
            mappedOutboundLegObj = this.getLegs().find(leg => leg.getLegId()===itineryObj.getOutboundLegId());
            mappedInboundLegObj = this.getLegs().find(leg => leg.getLegId()===itineryObj.getInboundLegId());
            //join legs + place
            if(mappedOutboundLegObj){
                mappedOutboundLegObj.setDestinationPlace(this.getPlaces().find(place => place.getPlaceId()===mappedOutboundLegObj.getDestinationStation()));
                mappedOutboundLegObj.setOriginPlace(this.getPlaces().find(place => place.getPlaceId()===mappedOutboundLegObj.getOriginStation()));
            }
           
            if(mappedInboundLegObj){
                mappedInboundLegObj.setDestinationPlace(this.getPlaces().find(place => place.getPlaceId()===mappedInboundLegObj.getDestinationStation()));
                mappedInboundLegObj.setOriginPlace(this.getPlaces().find(place => place.getPlaceId()===mappedInboundLegObj.getOriginStation()));
            }
           
            
            flightDetailObj.setOutboundLeg(mappedOutboundLegObj);
            flightDetailObj.setInboundLeg(mappedInboundLegObj);        
            //iterating all the avilable pricing options to create indivudua;
            let pricingOptionsAgentsList = this.joinPricingOptionWithAgents(itineryObj.getPricingOptions());
            for(let pricingObj of pricingOptionsAgentsList){
                let flightDetailObjCopy = flightDetailObj.getObjectCopy();
                flightDetailObjCopy.setPricingOptions(pricingObj);
                flightDetailsList.push(flightDetailObjCopy);
            }
           
           
        
        }
        return flightDetailsList;
    }
    /**
     * This function will merge PricingOptions & Agents.
     */
    joinPricingOptionWithAgents (pricingOptionsList){
        
         let pricingOptionsAgentsList=[];
         let utilityAgentObj = new Agent();
         let mappedCurrency = this.getCurrencies().find(currency => currency.getCurrencyCode()===this.getRequestCurrency());
         for (var pricingOption of pricingOptionsList) {
          
             if(pricingOption.getAgentList()!== undefined && pricingOption.getAgentIdList().length>0){
                let mappedAgentList=[];
           
                for(var agentId of pricingOption.getAgentIdList()){
                  
                    let mappedAgent={};
                    mappedAgent = this.getAgents().find(agent => agent.getAgentId()===agentId);
                    mappedAgentList.push(mappedAgent);
                }
                pricingOption.setCurrencyObject(mappedCurrency);
                pricingOption.setAgentList(mappedAgentList);
              
                pricingOptionsAgentsList.push(pricingOption);
             }
           
         }
         return pricingOptionsAgentsList;
     }
}

module.exports = UtilityClass;