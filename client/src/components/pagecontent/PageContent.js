import React, { Component } from 'react';
import './PageContent.scss';
import App from '../../App';
const searchFlights='http://localhost:4000/api/search';

class PageContent extends Component {
  
  constructor(){
    super();
    this.state={
       isLoadingModeOn:true,
       flightList:[],
       error:null
    }
    this.requestObj = App.getRequestObj();
    this.getQueryString = this.getQueryString.bind(this);
    this.getFlightList = this.getFlightList.bind(this);
    this.getFlightList();
  };
  getQueryString(){  
   
    let queryString = new URLSearchParams();
    for(let key in this.requestObj){
      if(key){
        queryString.append(key, this.requestObj[key])
      }
       
    }
    console.log('queryString = '+queryString.toString());
    return queryString.toString();
  }
  getFlightList(){

       console.log('Fn - getFlightList : fetching results from server...');
       let queryString = this.getQueryString();
       this.setState({ isLoadingModeOn: true });
       fetch(searchFlights+'?'+queryString)
          .then(response => response.json())
          .then(data =>{
              this.setState({ flightList: data, isLoadingModeOn: false });
              console.log('Total flights count :'+this.state.flightList.length);
          })
          .catch(error => this.setState({ error, isLoadingModeOn: false }));
   }

  render() {
   // console.log('this.props.requestObj = '+JSON.stringify(this.props.requestObj));
    const isLoadingModeOn = this.state.isLoadingModeOn;
    return (
      <div>
      <header-narrow>
      <nav-narrow class="topnav">
        <ul>
          <li><a href="#"><strong>Filter</strong></a></li>
          <li><a href="#"><strong>Sort</strong></a></li>
          <div className="pull-right">
          <li> <img className="menu-object-small" src={require('../../fonts/PNG/64px/082-bell.png')} alt=""/></li>
          <li><a href="#"><strong>Price alerts</strong></a></li>
          </div>
        </ul>
      </nav-narrow>
      </header-narrow>
      <main>
        {isLoadingModeOn ?(<span>Loading ...</span>):(
        <article>
       
           {this.state.flightList.map((flight, id) =>
                     <FlightCard key={id} flightData={flight}/> 
           )} 
          {/* {this.state.flightList.map((flight, id) => <FlightCard key={id} flightData={flight}/>)} */}
          
        {/* <FlightCard></FlightCard>
        <FlightCard></FlightCard>  */}
        </article>)}
      </main>
      </div>
    );//end of return
  }
  
}

//import arrowLogo from '../..//arrow-right-svg.svg';
class FlightCard extends React.Component {
 
  render() {
  
     return (
     
       <div className="card-container">
          {/* card row one for outboundLeg flight */}
          <div className="cards">
              <img className="card-object" src="https://logos.skyscnr.com/images/airlines/favicon/EZ.png" alt="Flight logo"/>
              <div className="card-body-col-1">
                {/* <p>07:00</p> */}
                <p>{this.props.flightData.inboundLeg.arrival.substring(this.props.flightData.outboundLeg.arrival.indexOf('T')+1)}</p>
                <p className="gray-font">{this.props.flightData.outboundLeg.originPlace.code}</p>
              </div>
              <div className="card-body-col-2">
                <img className="card-object-small" src={require('../../fonts/PNG/64px/317-arrow-right2.png')} alt=""/>
              </div>
              <div className="card-body-col-3">
                {/* <p>08:30</p> */}
                <p>{this.props.flightData.outboundLeg.departure.substring(this.props.flightData.outboundLeg.departure.indexOf('T')+1)}</p>
                <p className="gray-font">{this.props.flightData.outboundLeg.destinationPlace.code}</p>
              </div>
              <div className="card-body-col-4">
                {/* <p className="gray-font">1h 30</p> */}
                <p className="gray-font">{Math.trunc(this.props.flightData.outboundLeg.duration/60)}h
                &nbsp;{this.props.flightData.outboundLeg.duration%60}
                </p>
                {this.props.flightData.outboundLeg.stops.length===0 ? 
                   <p className="green-font">Direct</p>:
                   <p className="green-font">InDirect</p>
                }
              </div>
          </div>
          {/* card row one for inboundLeg flight */}
          <div className="cards">
            <img className="card-object" src="https://logos.skyscnr.com/images/airlines/favicon/EZ.png" alt="Flight logo"/>
            <div className="card-body-col-1">
              {/* <p>07:00</p> */}
              <p>{this.props.flightData.inboundLeg.arrival.substring(this.props.flightData.inboundLeg.arrival.indexOf('T')+1)}</p>
              <p className="gray-font">{this.props.flightData.inboundLeg.originPlace.code}</p>
            </div>
            <div className="card-body-col-2">
              <img className="card-object-small" src={require('../../fonts/PNG/64px/317-arrow-right2.png')} alt=""/>
            </div>
            <div className="card-body-col-3">
              {/* <p>08:30</p> */}
              <p>{this.props.flightData.inboundLeg.departure.substring(this.props.flightData.inboundLeg.departure.indexOf('T')+1)}</p>
              <p className="gray-font">{this.props.flightData.inboundLeg.destinationPlace.code}</p>
            </div>
            <div className="card-body-col-4">
              {/* <p className="gray-font">1h 30</p> */}
              <p className="gray-font">{Math.trunc(this.props.flightData.inboundLeg.duration/60)}h
              &nbsp;{this.props.flightData.inboundLeg.duration%60}
              </p>
              {this.props.flightData.inboundLeg.stops.length===0 ? 
                <p className="green-font">Direct</p>:
                <p className="green-font">InDirect</p>
              }
            </div>
          </div>
          <div className="cards">
            
              <div className="card-body-col-1">
                <p className="big-font">{this.props.flightData.pricingOptions.currencyObject.currencySymbol} {this.props.flightData.pricingOptions.price}</p>
                {this.props.flightData.pricingOptions.agentList.length===0 ? 
                <p className="gray-font">No Agent found</p>:
                 (
                  // <img className="menu-object-smal" src={this.props.flightData.pricingOptions.agentList[0].imageUrl} alt="Agent logo"/>
                  <p className="gray-font">{this.props.flightData.pricingOptions.agentList[0].agentName}</p>
                 )
                }
               
               
                {/* <p className="gray-font">omegaflighstore.com</p> */}
              </div>
            
              <div className="card-body-col-5">
              <button className="button">Select</button>
              </div>
          </div>
      </div>
     );
  }
}


export default PageContent;
