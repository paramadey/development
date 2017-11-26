
//constructor
function LegsModel(legId, segmentIds,originStation,destinationStation,departure,arrival,duration,
    journeyMode,stops,carriers,operatingCarriers,directionality,flightNumbers,originPlace,destinationPlace) {

    this.legId = legId;
    this.segmentIds = segmentIds;//array
    this.originStation = originStation;
    this.destinationStation = destinationStation;
    this.departure = departure;
    this.arrival = arrival;
    this.duration = duration;
    this.journeyMode = journeyMode;
    this.stops = stops;//array
    this.carriers = carriers;//array
    this.operatingCarriers = operatingCarriers;//array
    this.directionality = directionality;
    this.flightNumbers = flightNumbers; //array
    this.originPlace=originPlace===undefined ? {}:originPlace;
    this.destinationPlace=destinationPlace === undefined ? {} : destinationPlace;
  }

LegsModel.prototype.setLegId = function(legId) {
    this.legId = legId;
};
LegsModel.prototype.getLegId = function() {
    return this.legId ;
};
LegsModel.prototype.setOriginStation = function(originStation) {
    this.originStation = originStation;
};
LegsModel.prototype.getOriginStation = function() {
    return this.originStation ;
};
LegsModel.prototype.setDestinationStation = function(destinationStation) {
    this.destinationStation = destinationStation;
};
LegsModel.prototype.getDestinationStation = function() {
    return this.destinationStation ;
};
LegsModel.prototype.setDestinationPlace = function(destinationPlace) {
    this.destinationPlace = destinationPlace;
};
LegsModel.prototype.getDestinationPlace = function() {
    return this.destinationPlace ;
};
LegsModel.prototype.setOriginPlace = function(originPlace) {
    this.originPlace = originPlace;
};
LegsModel.prototype.getOriginPlace = function() {
    return this.originPlace ;
};
LegsModel.prototype.fromJson = function(legs) {
    let legObjectsArray = [];
    for(var leg of legs){
        let legObj= new LegsModel(leg.Id,leg.SegmentIds,leg.OriginStation,leg.DestinationStation,
            leg.Departure,leg.Arrival,leg.Duration,leg.JourneyMode,leg.Stops,
            leg.Carriers,leg.OperatingCarriers,leg.Directionality,leg.FlightNumbers);
            legObjectsArray.push(legObj);

    }
   return legObjectsArray;
}
module.exports = LegsModel;