//constructor
function Currency(currencyCode,currencySymbol) {
    this.currencyCode = currencyCode;
    this.currencySymbol = currencySymbol;
 
    //have not added other fields because it's not in use
  }

Currency.prototype.setCurrencySymbol = function(currencySymbol) {
    this.currencySymbol = currencySymbol;
};
Currency.prototype.getCurrencySymbol = function() {
    return this.currencySymbol;
};
Currency.prototype.setCurrencyCode = function(currencyCode) {
    this.currencyCode = currencyCode;
};
Currency.prototype.getCurrencyCode = function() {
    return this.currencyCode;
};

Currency.prototype.fromJson = function(currencyList) {
    if(currencyList===undefined){
        return [];
    }
    let currencyObjectsArray = [];
    
    for(var currency of currencyList){
     
        let currencyObj= new Currency(currency.Code,currency.Symbol);
        currencyObjectsArray.push(currencyObj);       
    }
   return currencyObjectsArray;
}
module.exports = Currency;