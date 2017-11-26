//constructor
function Place(placeId,placeName,code) {
    this.placeId = placeId;
    this.placeName = placeName;
    this.code = code;
    //have not added other fields because it's not in use
  }

Place.prototype.setPlaceId = function(placeId) {
    this.placeId = placeId;
};
Place.prototype.getPlaceId = function() {
    return this.placeId;
};
Place.prototype.setPlaceName = function(placeName) {
    this.placeName = placeName;
};
Place.prototype.getPlaceName = function() {
    return this.placeName;
};
Place.prototype.setCode = function(code) {
   this.code=code;
};
Place.prototype.getCode = function() {
   return this.code;
};
Place.prototype.fromJson = function(placeList) {
    if(placeList===undefined){
        return [];
    }
    let placeObjectsArray = [];
    
    for(var place of placeList){
      //  console.log('fromjson of Place = '+JSON.stringify(Place));
        let placeObj= new Place(place.Id,place.Name,place.Code);
        placeObjectsArray.push(placeObj);       
    }
   return placeObjectsArray;
}
module.exports = Place;