import React from 'react';
import style from './style.css';
import {Pager, Col, Row, Grid, FormControl} from 'react-bootstrap';
import { updateAddressState, setTabKey } from '../../actions/TourCreationActions';


class TourCreationLocation extends React.Component{
  constructor() {
    super();

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this._changeLocation = this._changeLocation.bind(this)
  }

  next(){
    this.props.dispatch(setTabKey("language"));
  }

  previous(){
    this.props.dispatch(setTabKey("info"));
  }

  _changeLocation(event) {
    this._emitUserChange({...this.props.tour.address, city: event.target.value});
  }

  _emitUserChange (newAddressState) {
    this.props.dispatch(updateAddressState(newAddressState))
  }

  render(){
    const options = [ {value:"null", optionName:"Choose a city"},
                      {value:"Philadelphia", optionName:"Philadelphia"},
                      {value:"New York", optionName:"New York"},
                      {value:"Washington DC", optionName:"Washington DC"} ];

    const dropdownOptions = options.map(function(option) {
      return (
        <option key={option.value} value={option.value}>{option.optionName}</option>
    )}, this);

    if(this.props.tour.address.city == "null"){
      return (
        <div>
          <br/>
          <p className={style.HeaderStyle}>Choose a city to host your tour!</p>
          <br/>
            <Col xs={8} md={6}>
              <FormControl componentClass="select" onChange={this._changeLocation} value={this.props.tour.address.city} >
                {dropdownOptions}
              </FormControl>
            </Col>
          <br/>
            <Pager>
              <Pager.Item previous onSelect={this.previous}>&larr; Go Back</Pager.Item>
              <Pager.Item disabled next onSelect={this.next}>Next &rarr;</Pager.Item>
            </Pager>
        </div>
      )
    }
    else{
      return (
        <div>
          <br/>
          <p className={style.HeaderStyle}>Choose a city to host your tour!</p>
          <br/>
            <Col xs={8} md={6}>
              <FormControl componentClass="select" onChange={this._changeLocation} value={this.props.tour.address.city} >
                {dropdownOptions}
              </FormControl>
            </Col>
          <br/>
            <Pager>
              <Pager.Item previous onSelect={this.previous}>&larr; Go Back</Pager.Item>
              <Pager.Item next onSelect={this.next}>Next &rarr;</Pager.Item>
            </Pager>
        </div>
      )
    }
  }
}

export default TourCreationLocation;
