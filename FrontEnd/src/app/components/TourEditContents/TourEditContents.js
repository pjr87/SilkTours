import React from 'react';
import { Link } from 'react-router';

import style from "./style.css";

import {Image, Col, Row, Grid, Thumbnail, Button, Modal, Form, FormControl, FormGroup, ControlLabel, Panel, ListGroupItem, ListGroup} from 'react-bootstrap';

import {connect} from 'react-redux';

import { browserHistory } from 'react-router';

import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

import * as service from '../../utils/databaseFunctions';

import { updateTour, setSelectedTour } from '../../actions/TourEditActions';

import {EditableField, FormTitle, DoubleEditableField, FormButton, EditableTextField, EditableDropdownField} from '../Forms/Forms.js';


class TourEditContents extends React.Component{
  constructor(props) {
    super();
    this.state = {
      showModal: false,
      selectedDate: "",
      validationState: null,
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this._emitSelectedTourChange = this._emitSelectedTourChange.bind(this);
  }

  handleChange(name, e) {
    //     this._emitUserChange({...this.props.user, last_name: event.target.value});

    this._emitSelectedTourChange({...this.props.selectedTour, [name]: e.target.value});
  }

  _emitSelectedTourChange(newSelectedTourState){
    this.props.dispatch(updateTour(newSelectedTourState));
  }

  handleSubmit(){
        this.setState({isLoading:true});
  }


  render(){
    console.log("mytour");
    console.dir(this.props.selectedTour);

    const options = [ {value:0.5, optionName:"30 Minutes"},
                      {value:1, optionName:"1 Hour"},
                      {value:1.5, optionName:"1 Hour 30 Minutes"},
                      {value:2, optionName:"2 Hours"},
                      {value:2.5, optionName:"2 Hours 30 Minutes"},
                      {value:3, optionName:"3 Hours"},
                      {value:3.5, optionName:"3 Hours 30 Minutes"},
                      {value:4, optionName:"4 Hours"}];

    const dropdownOptions = options.map(function(option) {
      return (
        <option value={option.value}>{option.optionName}</option>
    )}, this);

    return (
      <div>
        <div>
          <div className={style.boxed}>
            <p className={style.tourTitle}>{this.props.selectedTour.name}</p>
            <p className={style.tourSubTitle}>Edit Tour</p>
          </div>
        </div>
        <div className = {style.thumbnailContainer}>
          <Thumbnail src={this.props.selectedTour.profile_image}>
            <Grid>
              <Row>
                <Col sm={12}>
                  <Form horizontal>
                    <div>
                      <Col smOffset={2}>
                        <div className={style.formHeader}>Basic Fields</div>
                      </Col>
                    </div>

                    <FormGroup>
                      <Col smOffset={2} xs={4} md={2}>
                        <ControlLabel>Name</ControlLabel>
                      </Col>
                      <Col xs={8} md={6}>
                        <FormControl type="input" onChange={this.handleChange.bind(this, 'name')} value={this.props.selectedTour.name} />
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col smOffset={2} xs={4} md={2}>
                        <ControlLabel>Price</ControlLabel>
                      </Col>
                      <Col xs={8} md={6}>
                        <FormControl type="input" onChange={this.handleChange.bind(this, 'price')} value={this.props.selectedTour.price} />
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col smOffset={2} xs={4} md={2}>
                        <ControlLabel>Language</ControlLabel>
                      </Col>
                      <Col xs={8} md={6}>
                        <FormControl type="input" onChange={this.handleChange.bind(this, 'language')} value={this.props.selectedTour.language} />
                      </Col>
                    </FormGroup>

                    <FormGroup controlId={this.props.id}>
                      <Col smOffset={2} xs={4} md={2}>
                        <ControlLabel>Description</ControlLabel>
                      </Col>
                      <Col xs={8} md={6} >
                            <FormControl style={{resize: "vertical"}} componentClass="textarea" onChange={this.handleChange.bind(this, 'description')} value={this.props.selectedTour.description} />
                      </Col>
                    </FormGroup>

                    <FormGroup controlId={this.props.id}>
                      <Col smOffset={2} xs={4} md={2}  >
                        <ControlLabel>Tour Length</ControlLabel>
                      </Col>
                      <Col xs={8} md={6}>
                        <FormControl componentClass="select" onChange={this.handleChange.bind(this, 'length')} defaultValue={this.props.selectedTour.length} selected={this.props.selectedTour.length}>
                          {dropdownOptions}
                        </FormControl>
                      </Col>
                    </FormGroup>


                    <FormGroup validationState = {this.props.errorMessage ? "error" : "success"}>
                      <Col xsOffset={6} xs={4} componentClass="pullRight">
                        <Button
                          style={{"float": "right", "text-align":"right"}}                          
                          disabled={this.state.isLoading}
                          onClick={!this.state.isLoading ? this.onSubmitClick : null}>
                          {this.state.isLoading ? 'Submitting Edits...' : 'Submit Tour Edits'}
                        </Button>
                      </Col>
                    </FormGroup>
                    

                  </Form>
                </Col>
              </Row>
            </Grid>
          </Thumbnail>
        </div>
      </div>
      );

    }
  }

TourEditContents.propTypes = {
  auth: React.PropTypes.object,
  selectedTourId: React.PropTypes.string,
  selectedTour: React.PropTypes.object,
  isLoaded: React.PropTypes.bool
}

function select (state) {
  return {
    auth: state.AuthReducer.auth,
    loggedIn: state.AuthReducer.loggedIn,
    selectedTourId: state.TourEditReducer.selectedTourId,
    selectedTour: state.TourEditReducer.selectedTour,
    isLoaded: state.TourEditReducer.isLoaded
  };
}

export default connect(select)(TourEditContents);
