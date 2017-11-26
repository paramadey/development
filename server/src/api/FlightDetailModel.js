//constructor
function FlightDetailModel(outboundLeg, inboundLeg,pricingOptions) {
    this.outboundLeg = outboundLeg === undefined ? {} : outboundLeg;
    this.inboundLeg = inboundLeg === undefined ? {} : inboundLeg;
    this.pricingOptions=pricingOptions === undefined ? []:pricingOptions;
  }

FlightDetailModel.prototype.setOutboundLeg = function(outboundLeg) {
    this.outboundLeg = outboundLeg;
};
FlightDetailModel.prototype.getOutboundLeg = function() {
    return this.outboundLeg;
};
FlightDetailModel.prototype.setInboundLeg = function(inboundLeg) {
    this.inboundLeg = inboundLeg;
};
FlightDetailModel.prototype.getInboundLeg = function() {
    return this.inboundLeg;
};
FlightDetailModel.prototype.setPricingOptions = function(pricingOptions) {
    this.pricingOptions = pricingOptions;
};
FlightDetailModel.prototype.getPricingOptions = function() {
    return  this.pricingOptions;
};
/**
 * This is the function to perform deep copy. It copies all the properties and return a new object.
 */
FlightDetailModel.prototype.getObjectCopy = function(){
   let outboundLeg ={},inboundLeg={}, pricingOptions=[];
   if(this.getOutboundLeg()){
    outboundLeg = Object.assign({}, this.getOutboundLeg());
   }
   if( this.getInboundLeg()){
    inboundLeg = Object.assign({}, this.getInboundLeg());
   }
   if( this.getPricingOptions()){
    pricingOptions = Object.assign({}, this.getPricingOptions());
   }
 
   return new FlightDetailModel(outboundLeg,inboundLeg,pricingOptions);
}

module.exports = FlightDetailModel;