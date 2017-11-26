import React, { Component } from 'react';
import './App.scss';

import TopNav from './components/topnav';
import PageContent from './components/pagecontent';
const requestObj = {"country":"UK","currency":"GBP","class":"Economy","locale":"en-GB","locationSchema":"iata","fromPlace":"EDI","toPlace":"LHR","fromDate":"2017-12-01","toDate":"2017-12-02","adults":1,"children":0,"infants":0,"apiKey":"ss630745725358065467897349852985"};
class App extends Component {
  
  render() {
   
    return (
      <div className="App">
        <TopNav requestObj={requestObj}/>
        <PageContent requestObj={requestObj}/>
      </div>
    );
  }
  static  getRequestObj(){
    return requestObj;
  }
}

export default App;
