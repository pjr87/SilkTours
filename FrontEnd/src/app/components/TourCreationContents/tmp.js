import React from 'react';

import {PageTitle, BannerImage, Interests, TourModify} from 'components';
import style from './style.css';
import { Button, HelpBlock, FormGroup, Col } from 'react-bootstrap';
import * as service from '../../utils/databaseFunctions';
import {connect} from 'react-redux';

class TourCreationPage extends React.Component{

  constructor(props) {
    super();

    this.onSubmitClick = this.onSubmitClick.bind(this)
  }

  onSubmitClick(){
    var tempTour = this.state.tour;

    tempTour.bypass = true;
    console.log("submit clicked!->",tempTour);

    service.newTour(tempTour);
  }

  onChange(val, fieldName){
    console.log("text changed!, " + fieldName);
    var u = this.state.tour;
    u[fieldName] = val;
    this.setState({tour:u});
  }

  onAddressChange(val, fieldName){
    console.log("address text changed!, " + fieldName);
    var t = this.state.tour;
    t.address[fieldName] = val;
    this.setState({tour:t});
    console.log("tour.address", this.state.tour.address)
  }

  updateStops(s){
    var t = this.state.tour;
    t.stops = s;
    this.setState({tour: t});
  }

  updateInterests(i){
    var tour = this.state.tour;
    tour.interests = i;
    this.setState({tour});
  }

  render(){
    return (
      <div>
        <br />
        <br />
        <div className={style.mainBody}>
          <PageTitle title= "tour creation"/>
          <TourModify updateInterests={this.updateInterests.bind(this)} updateStops={this.updateStops.bind(this)} onTourChange={this.onChange.bind(this)} onAddressChange={this.onAddressChange.bind(this)} formTitle="Tour Creation" tour={this.state.tour} />
          <FormGroup
            validationState = {this.props.errorMessage ? "error" : "success"}>
            <Col smOffset={2} sm={10}>
              <ErrorFunc errorText = {this.props.errorMessage} />
              <Button
                disabled={isLoading}
                onClick={!isLoading ? this.onSubmitClick : null}>
                {isLoading ? 'Updating...' : 'Update Profile'}
              </Button>
            </Col>
          </FormGroup>
        </div>
      </div>
    );
  }
}

export default connect(select)(TourCreationPage);
