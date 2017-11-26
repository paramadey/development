const PricingOption = require("./PricingOption.js");
//constructor
function Itineraries(outboundLegId, inboundLegId,pricingOptions) {
    let pricingOptionObj = new PricingOption();
    this.outboundLegId = outboundLegId;
    this.inboundLegId = inboundLegId;
    this.pricingOptions= pricingOptionObj.fromJson(pricingOptions);
  
    //have not added BookingDetailsLink because it's not in use
  }

Itineraries.prototype.setOutboundLegId = function(outboundLegId) {
    this.outboundLegId = outboundLegId;
};
Itineraries.prototype.getOutboundLegId = function() {
    return this.outboundLegId;
};
Itineraries.prototype.setInboundLegId = function(inboundLegId) {
   this.inboundLegId=inboundLegId;
};
Itineraries.prototype.getInboundLegId = function() {
   return this.inboundLegId;
};
Itineraries.prototype.setPricingOptions = function(pricingOptions) {
    this.pricingOptions=pricingOptions;
 };
 Itineraries.prototype.getPricingOptions = function() {
    return this.pricingOptions;
 };
 Itineraries.prototype.fromJson = function(itineries) {
   if(itineries===undefined){
    return [];
   }
    let itineryObjectsArray = [];
   // console.log('Itineries fromJson = '+itineries);
    for(var itinery of itineries){
      
        let itineryObj= new Itineraries(itinery.OutboundLegId, itinery.InboundLegId,itinery.PricingOptions);
        itineryObjectsArray.push(itineryObj);       
    }
  
   return itineryObjectsArray;
}
module.exports = Itineraries;