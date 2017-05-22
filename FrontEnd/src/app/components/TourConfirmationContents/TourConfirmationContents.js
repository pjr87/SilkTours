import React from 'react';
import {connect} from 'react-redux';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Grid from 'react-bootstrap/lib/Grid';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import Button from 'react-bootstrap/lib/Button';

import { Link } from 'react-router';

import Style from './style.css'

class TourConfirmationContents extends React.Component{
  render(){
    return(
      <div className={Style.tourDetailContentsThumbnail}>
        <Thumbnail>
          <Grid>
            <Row>
              <Col sm={12} md={12} lg={12}>
                <div className={Style.tourDetailContents}>
                  <img src={this.props.selectedTour.profile_image}/>
                  <p>Name: {this.props.user.first_name} {this.props.user.last_name}</p>
                  <p>Phone Number: {this.props.user.phone_number}</p>
                  <p>Date: {this.props.selectedTourDateString}</p>
                  <p>Time: {this.props.selectedTourDateStart} ~ {this.props.selectedTourDateEnd}</p>
                  <p>Tour Name: {this.props.selectedTour.name}</p>
                  <p>Description: {this.props.selectedTour.description}</p>
                  <p>Guide: </p>
                  {this.props.selectedTour.guides.map((guides, i) => {
                    return (
                      <li key={i}>{guides.first_name} {guides.last_name}</li>);
                  })}
                  <p>Stops: </p>
                    {this.props.selectedTour.stops.map((stops, i) => {
                      return (
                        <li key={i}>{i+1}</li>);
                    })}
                  <p>Credit Card: xxxx xxxx xxxx 1111</p>
                  <p>Paid Amount: ${this.props.selectedTour.price}</p>
                  <br/>
                  <Link to={{pathname: '/explore' }}>
                    <Button>Ok</Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Grid>
        </Thumbnail>
      </div>
    );
  }
}

function select (state) {
  return {
    user: state.AuthReducer.user,
    selectedTour: state.TourDetailReducer.selectedTour,
    selectedTourDateString: state.TourDetailReducer.selectedTourDateString,
    selectedTourDateStart: state.TourDetailReducer.selectedTourDateStart,
    selectedTourDateEnd: state.TourDetailReducer.selectedTourDateEnd,
    isLoaded: state.TourDetailReducer.isLoaded
  };
}

export default connect(select)(TourConfirmationContents);
