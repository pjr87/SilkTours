import React from 'react';
import style from '../../style/style.css';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'
import {connect} from 'react-redux';
import {PageTitle, ProfileHeader, Confirm} from 'components';
import {Nav, Modal, Button} from 'react-bootstrap/lib/';
import NavItem from 'react-bootstrap/lib/NavItem';
import Navbar from 'react-bootstrap/lib/Navbar';
import {LinkContainer} from 'react-router-bootstrap';
import { clearError } from '../../actions/AuthActions';
import Overview from './Overview';
import MyGuide from './MyGuide';
import MyTours from './MyTours';
import Favorites from './Favorites';
import { getUser } from '../../actions/AuthActions';
import * as service from '../../utils/databaseFunctions.js';

class MyToursContents extends React.Component{
  constructor() {
     super();
     this.state = {
       tab: 'overview',
       showModal: false
     }

    this.cancelTourEvent = this.cancelTourEvent.bind(this);
  }

  buttonHandler(val){
    this.setState( {tab:val} );
  }

  cancelTourEvent(tourEventId, isGuide){
    console.log(tourEventId, " ", isGuide);
    console.log("CLICKED222");

    var obj = {};

    if(isGuide)
    {
      obj = {
      "state": "D",
      "id_user": null
      };
    }
    else
    {
      obj = {
      "state": "A",
      "id_user": null
      }
    }

    service.putTourEventById(tourEventId, JSON.parse(JSON.stringify(obj)), this.props.auth).then(function(response){
      console.log("response", response);
      location.reload();
    });


  }

  componentWillMount(){
        console.log(this.props.id_user, this.props.auth);

    this.props.dispatch(getUser(this.props.id_user, this.props.auth));
  }

  render(){

    var toursTeaching =[];
    for( var i = 0, len = this.props.user.tours_teaching.length; i < len; i++) {
      for(var j=0, len2 = this.props.user.tours_teaching[i].events.length; j < len2; j++)
      {
        toursTeaching.push(this.props.user.tours_teaching[i].events[j]);
        console.log(this.props.user.tours_teaching[i].events[j].id_tourEvent);
      }
    }


    console.log("teaching", toursTeaching );

    if(this.state.tab == 'overview'){
      var tabPag = <Overview toursGuided={toursTeaching} cancelTourEvent={this.cancelTourEvent.bind(this)}/>;
    }
    if(this.state.tab == 'myguide'){

      var tabPag = <MyGuide toursGuided={toursTeaching} cancelTourEvent={this.cancelTourEvent.bind(this)} allToursGuided={this.props.user.tours_teaching} />;
    }
    if(this.state.tab == 'mytour'){
      console.log("user:",this.props.user);
      var tabPag = <MyTours toursTaken={this.props.user.tours_taking} cancelTourEvent={this.cancelTourEvent.bind(this)}/>;
    }
    if(this.state.tab == 'favorites'){
      var tabPag = <Favorites/>;
    }
    return (
      <div>
        <ProfileHeader
          profilePicture={this.props.user.profile_picture}
          name={this.props.user.first_name+" "+this.props.user.last_name} />
        <Navbar>
          <Navbar.Header>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} onClick={this.buttonHandler.bind(this,"overview")}>Overview</NavItem>
              {this.props.user.is_guide && <NavItem eventKey={2} onClick={this.buttonHandler.bind(this,"myguide")}>MyGuide</NavItem>}
              <NavItem eventKey={3} onClick={this.buttonHandler.bind(this,"mytour")}>MyTours</NavItem>
              <NavItem eventKey={3} onClick={this.buttonHandler.bind(this,"favorites")}>Favorites</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {tabPag}
      </div>
    );
  }
}

MyToursContents.propTypes = {
  currentlySending: React.PropTypes.bool,
  id_user: React.PropTypes.number,
  auth: React.PropTypes.object,
  user: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  errorMessage: React.PropTypes.string
}

function select (state) {
  return {
    id_user: state.AuthReducer.id_user,
    auth: state.AuthReducer.auth,
    user: state.AuthReducer.user,
    currentlySending: state.AuthReducer.currentlySending,
    errorMessage: state.AuthReducer.errorMessage
  };
}

export default connect(select)(MyToursContents);
