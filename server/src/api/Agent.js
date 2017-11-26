//constructor
function Agent(agentId,agentName,imageUrl,price) {
    this.agentId = agentId;
    this.agentName = agentName;
    this.imageUrl = imageUrl;
    //have not added other fields because it's not in use
  }

Agent.prototype.setAgentId = function(agentId) {
    this.agentId = agentId;
};
Agent.prototype.getAgentId = function() {
    return this.agentId;
};
Agent.prototype.setAgentName = function(agentName) {
    this.agentName = agentName;
};
Agent.prototype.getAgentName = function() {
    return this.agentName;
};
Agent.prototype.setImageUrl = function(imageUrl) {
   this.imageUrl=imageUrl;
};
Agent.prototype.getImageUrl = function() {
   return this.imageUrl;
};
Agent.prototype.fromJson = function(agentList) {
    if(agentList===undefined){
        return [];
    }
    let agentObjectsArray = [];
    
    for(var agent of agentList){
      //  console.log('fromjson of Agent = '+JSON.stringify(agent));
        let agentObj= new Agent(agent.Id,agent.Name,agent.ImageUrl);
        agentObjectsArray.push(agentObj);       
    }
   return agentObjectsArray;
}
module.exports = Agent;