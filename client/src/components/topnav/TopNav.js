import React,{Component} from 'react';
import './TopNav.scss';
import logo from '../..//logo.svg';

class TopNav extends Component {
 
  render(){
   
    return (
        <header>
            <navtop>
            <ul>
              <li>
                <a href="/">
                
                  <img className='logo' alt="Skyscanner" src={logo}/>
                  <span className='logoText'>Skyscanner</span>
                </a>
              </li>
              <li className="pull-right"> 
                <a href="/">
                <img className="menu-object-small" src={require('../../fonts/PNG/64px/190-menu.png')} alt=""/>
                </a>  
              </li>
            
            </ul>
            </navtop>
            <div className="heading-card-container">
                <div className="heading-cards">
                      
                      <div className="heading-card-body-col-1">
                        <span className="large-white-font">{this.props.requestObj.fromPlace}</span>
                      </div>
                      <div className="heading-card-body-col-2">
                        <img className="card-object-small" src={require('../../fonts/PNG/64px/317-arrow-right2.png')} alt=""/>
                      </div>
                      <div className="heading-card-body-col-3">
                      
                        <span className="large-white-font">{this.props.requestObj.toPlace}</span>
                      </div>       
                  </div>
                  <div className="heading-cards-row-2">
                    
                      <div className="card-body-col-1">
                        <span className="white-font">{this.props.requestObj.adults+this.props.requestObj.children+this.props.requestObj.infants} travellers, {this.props.requestObj.class}</span>
                      </div>          
                  </div>
            </div>
          </header>
    );
  }
  
};

export default TopNav;
