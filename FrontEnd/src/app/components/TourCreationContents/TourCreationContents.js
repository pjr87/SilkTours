import React from 'react';
import logoImg from '../../style/images/logo.png';
import {PageTitle, BannerImage, Interests, TourModify} from 'components';
import style from './style.css';
import { Button, HelpBlock, FormGroup, Col, Row, Tab, Nav, NavItem, Image } from 'react-bootstrap';
import * as service from '../../utils/databaseFunctions';
import {connect} from 'react-redux';
import { setTabKey, updateCoordinates } from '../../actions/TourCreationActions';

import TourCreationInfo from './TourCreationInfo';
import TourCreationLocation from './TourCreationLocation';
import TourCreationLanguage from './TourCreationLanguage';
import TourCreationTitle from './TourCreationTitle';
import TourCreationTime from './TourCreationTime';
import TourCreationPhotos from './TourCreationPhotos';
import TourCreationDescription from './TourCreationDescription';
import TourCreationInterests from './TourCreationInterests';
import TourCreationStops from './TourCreationStops';
import TourCreationAdditional from './TourCreationAdditional';
import TourCreationPrice from './TourCreationPrice';
import TourCreationReview from './TourCreationReview';

class TourCreationContents extends React.Component{
  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
    this.handleMap = this.handleMap.bind(this);
  }

  handleSelect(key){
    if(this.props.navAllowed){
      window.scrollTo(0, 0);
      console.log("to Top");
      //this.props.dispatch(setTabKey(key));
    }
    else{
      console.log("Navigation is not allowed until on review page")
    }
  }

  handleMap(){
    const coords = {
      lat: 39.955981,
      lng: -75.188033
    };
    this.props.dispatch(updateCoordinates(coords));
  }

  render(){
    return (
      <div>
        <div className={style.mainBody}>
          <Tab.Container activeKey={this.props.tabKey} onSelect={this.handleSelect} id="left-tabs-example" defaultActiveKey="location">
            <Row className="clearfix">
              <Col sm={4}>
                <Nav stacked bsStyle="pills" className={style.ContainerStyle} >
                  <NavItem eventKey="info">
                    <Image src={logoImg} style={{width:65, height:65, marginTop: -8}} circle/>
                  </NavItem>
                  <NavItem eventKey="location">
                    <p className={style.TabStyle}>Location</p>
                  </NavItem>
                  <NavItem eventKey="language">
                    <p className={style.TabStyle}>Language</p>
                  </NavItem>
                  <NavItem eventKey="title">
                    <p className={style.TabStyle}>Title</p>
                  </NavItem>
                  <NavItem eventKey="time">
                    <p className={style.TabStyle}>Set Time</p>
                  </NavItem>
                  <NavItem eventKey="photos">
                    <p className={style.TabStyle}>Photos</p>
                  </NavItem>
                  <NavItem eventKey="description">
                    <p className={style.TabStyle}>Description</p>
                  </NavItem>
                  <NavItem eventKey="interests">
                    <p className={style.TabStyle}>Interests</p>
                  </NavItem>
                  <NavItem eventKey="stops" onSelect={this.handleMap}>
                    <p className={style.TabStyle}>Stops</p>
                  </NavItem>
                  <NavItem eventKey="additional">
                    <p className={style.TabStyle}>Additional Services</p>
                  </NavItem>
                  <NavItem eventKey="price">
                    <p className={style.TabStyle}>Price</p>
                  </NavItem>
                  <NavItem eventKey="review">
                    <p className={style.TabStyle}>Review and Submit</p>
                  </NavItem>
                </Nav>
              </Col>
              <Col sm={8}>
                <Tab.Content animation >
                  <Tab.Pane eventKey="info">
                    <TourCreationInfo
                      user={this.props.user}
                      tour={this.props.tour}
                      dispatch={this.props.dispatch}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="location">
                    <TourCreationLocation
                      tour={this.props.tour}
                      dispatch={this.props.dispatch}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="language">
                    <TourCreationLanguage
                      tour={this.props.tour}
                      dispatch={this.props.dispatch}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="title">
                    <TourCreationTitle
                      tour={this.props.tour}
                      dispatch={this.props.dispatch}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="time">
                    <TourCreationTime
                      tour={this.props.tour}
                      dispatch={this.props.dispatch}
                      hours_special={this.props.hours_special}
                      hours_special_dates={this.props.hours_special_dates}
                      base_hours={this.props.base_hours}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="photos">
                    <TourCreationPhotos
                      tour={this.props.tour}
                      dispatch={this.props.dispatch}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="description">
                    <TourCreationDescription
                      tour={this.props.tour}
                      dispatch={this.props.dispatch}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="interests">
                    <TourCreationInterests
                      tour={this.props.tour}
                      dispatch={this.props.dispatch}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="stops">
                    <TourCreationStops
                      tour={this.props.tour}
                      dispatch={this.props.dispatch}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="additional">
                    <TourCreationAdditional
                      tour={this.props.tour}
                      dispatch={this.props.dispatch}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="price">
                    <TourCreationPrice
                      tour={this.props.tour}
                      dispatch={this.props.dispatch}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="review">
                    <TourCreationReview
                      errorMessage={this.props.errorMessage}
                      currentlySending={this.props.currentlySending}
                      tour={this.props.tour}
                      dispatch={this.props.dispatch}
                      auth={this.props.auth}
                      photos={this.props.photos}
                      hours_special={this.props.hours_special}
                      base_hours={this.props.base_hours}
                      navAllowed={this.props.navAllowed}/>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    );
  }
}

TourCreationContents.propTypes = {
  currentlySending: React.PropTypes.bool,
  auth: React.PropTypes.object,
  user: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  tour: React.PropTypes.object,
  endTime: React.PropTypes.number,
  startTime: React.PropTypes.number,
  errorMessage: React.PropTypes.string,
  tabKey: React.PropTypes.string,
  photos: React.PropTypes.object,
  hours_special: React.PropTypes.array,
  hours_special_dates: React.PropTypes.array,
  base_hours: React.PropTypes.array,
  navAllowed: React.PropTypes.bool,
}

function select (state) {
  return {
    auth: state.AuthReducer.auth,
    user: state.AuthReducer.user,
    startTime: state.TourCreationReducer.startTime,
    endTime: state.TourCreationReducer.endTime,
    currentlySending: state.TourCreationReducer.currentlySending,
    errorMessage: state.TourCreationReducer.errorMessage,
    tour: state.TourCreationReducer.tour,
    photos: state.TourCreationReducer.photos,
    tabKey: state.TourCreationReducer.tabKey,
    hours_special: state.TourCreationReducer.hours_special,
    hours_special_dates: state.TourCreationReducer.hours_special_dates,
    base_hours: state.TourCreationReducer.base_hours,
    navAllowed: state.TourCreationReducer.navAllowed
  };
}

export default connect(select)(TourCreationContents);
