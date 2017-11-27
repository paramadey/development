import React, { Component } from 'react';
import './PageContent.scss';
import App from '../../App';
import TiArrowRight from 'react-icons/lib/ti/arrow-right';
import FaBell from 'react-icons/lib/fa/bell';
//import TiBell from 'react-icons/lib/ti/bell';
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
          {/* <li> <img className="menu-object-small" src={require('../../fonts/PNG/64px/082-bell.png')} alt=""/></li> */}
          <li className="alert-icon">  <FaBell className="theme-color-font"/></li>
          <li>  <a href="#"><strong>Price alerts</strong></a></li>
          </div>
        </ul>
      </nav-narrow>
      </header-narrow>
      <main>
       
        {isLoadingModeOn ?(
        
              <div>
                  <svg className="hourglass" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 206" preserveAspectRatio="none">
                  <path className="middle" d="M120 0H0v206h120V0zM77.1 133.2C87.5 140.9 92 145 92 152.6V178H28v-25.4c0-7.6 4.5-11.7 14.9-19.4 6-4.5 13-9.6 17.1-17 4.1 7.4 11.1 12.6 17.1 17zM60 89.7c-4.1-7.3-11.1-12.5-17.1-17C32.5 65.1 28 61 28 53.4V28h64v25.4c0 7.6-4.5 11.7-14.9 19.4-6 4.4-13 9.6-17.1 16.9z"/>
                  <path className="outer" d="M93.7 95.3c10.5-7.7 26.3-19.4 26.3-41.9V0H0v53.4c0 22.5 15.8 34.2 26.3 41.9 3 2.2 7.9 5.8 9 7.7-1.1 1.9-6 5.5-9 7.7C15.8 118.4 0 130.1 0 152.6V206h120v-53.4c0-22.5-15.8-34.2-26.3-41.9-3-2.2-7.9-5.8-9-7.7 1.1-2 6-5.5 9-7.7zM70.6 103c0 18 35.4 21.8 35.4 49.6V192H14v-39.4c0-27.9 35.4-31.6 35.4-49.6S14 81.2 14 53.4V14h92v39.4C106 81.2 70.6 85 70.6 103z"/>
                  </svg>
              </div>)
              :(
        <article>
       
           {this.state.flightList.map((flight, id) =>
                     <FlightCard key={id} flightData={flight}/> 
           )} 
          {/* {this.state.flightList.map((flight, id) => <FlightCard key={id} flightData={flight}/>)} */}
          
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
              <img className="card-object" src={this.props.flightData.outboundLeg.carrierObject.carrierImageUrl} alt="Flight logo"/>
              <div className="card-body-col-1">
                {/* <p>07:00</p> */}
                <p>{this.props.flightData.inboundLeg.arrival.substring(this.props.flightData.outboundLeg.arrival.indexOf('T')+1)}</p>
                <p className="gray-font">{this.props.flightData.outboundLeg.originPlace.code}</p>
              </div>
              <div className="card-body-col-2">
                {/* <img className="card-object-small" src={require('../../fonts/PNG/64px/317-arrow-right2.png')} alt=""/> */}
               <TiArrowRight className="gray-font big-icon"/>
              </div>
              <div className="card-body-col-3">
                {/* <p>08:30</p> */}
                <p>{this.props.flightData.outboundLeg.departure.substring(this.props.flightData.outboundLeg.departure.indexOf('T')+1)}</p>
                <p className="gray-font">{this.props.flightData.outboundLeg.destinationPlace.code}</p>
              </div>
              <div className="card-body-col-4">
                {/* <p className="gray-font">1h 30</p> */}
                <p className="gray-font">{Math.trunc(this.props.flightData.outboundLeg.duration/60)}h
                {this.props.flightData.outboundLeg.duration%60}
                </p>
                {this.props.flightData.outboundLeg.stops.length===0 ? 
                   <p className="green-font">Direct</p>:
                   <p className="green-font">InDirect</p>
                }
              </div>
          </div>
          {/* card row one for inboundLeg flight */}
          <div className="cards">
            <img className="card-object"  src={this.props.flightData.inboundLeg.carrierObject.carrierImageUrl}  alt="Flight logo"/>
            <div className="card-body-col-1">
              {/* <p>07:00</p> */}
              <p>{this.props.flightData.inboundLeg.arrival.substring(this.props.flightData.inboundLeg.arrival.indexOf('T')+1)}</p>
              <p className="gray-font">{this.props.flightData.inboundLeg.originPlace.code}</p>
            </div>
            <div className="card-body-col-2">
              {/* <img className="card-object-small" src={require('../../fonts/PNG/64px/317-arrow-right2.png')} alt=""/> */}
              <TiArrowRight className="gray-font big-icon"/>
            </div>
            <div className="card-body-col-3">
              {/* <p>08:30</p> */}
              <p>{this.props.flightData.inboundLeg.departure.substring(this.props.flightData.inboundLeg.departure.indexOf('T')+1)}</p>
              <p className="gray-font">{this.props.flightData.inboundLeg.destinationPlace.code}</p>
            </div>
            <div className="card-body-col-4">
              {/* <p className="gray-font">1h 30</p> */}
              <p className="gray-font">{Math.trunc(this.props.flightData.inboundLeg.duration/60)}h
             {this.props.flightData.inboundLeg.duration%60}
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
