const Agent = require("./Agent.js");
const Currency = require("./Currency.js");
//constructor
function PricingOption(agentIdList,price,currencyObject) {
    this.agentIdList=agentIdList;//agent Ids array
   // let agentObj = new Agent();
    this.agentList = [];
    this.price = price;
    this.currencyObject=currencyObject===undefined ? {} : currencyObject;
 
    //have not added DeeplinkUrl because it's not in use
  }
PricingOption.prototype.setAgentIdList = function(agentIdList) {
    this.agentIdList = agentIdList;
};
PricingOption.prototype.getAgentIdList = function() {
    return this.agentIdList;
};
PricingOption.prototype.setAgentList = function(agentList) {
    this.agentList = agentList;
};
PricingOption.prototype.getAgentList = function() {
    return this.agentList;
};
PricingOption.prototype.setPrice = function(price) {
    this.price=price;
};
PricingOption.prototype.getPrice = function() {
    return this.price;
};
PricingOption.prototype.setCurrencyObject = function(currencyObject) {
    this.currencyObject=currencyObject;
};
PricingOption.prototype.getCurrencyObject = function() {
    return this.currencyObject;
};

PricingOption.prototype.fromJson = function(pricingOptions) {
  
    if(pricingOptions===undefined){
         return [];
    }
    let pricingOptionObjectsArray = [];
    
    for(var pricingOption of pricingOptions){
       //console.log('fromjson of PricingOption = '+JSON.stringify(pricingOption));
        let pricingOptionObj= new PricingOption(pricingOption.Agents,pricingOption.Price,pricingOption.currencyObject);
        pricingOptionObjectsArray.push(pricingOptionObj);       
    }
   return pricingOptionObjectsArray;
}
module.exports = PricingOption;