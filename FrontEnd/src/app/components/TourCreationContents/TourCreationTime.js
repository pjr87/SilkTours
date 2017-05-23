import React from 'react';
import ReactDOM from 'react-dom';
import style from './style.css';
import {EditableFieldClass} from '../Forms/Forms.js';
import {
  updateTimeState,
  setStartTime,
  setEndTime,
  setTabKey,
  updateSpecialTimeState,
  updateSpecialTimeDateState,
  updateLengthState} from '../../actions/TourCreationActions';
import MultiDateSelect from '../Date/MultiDateSelect';
import moment from 'moment';
import {Grid, Col, Row, ControlLabel, Pager, FormGroup, Form, FormControl} from 'react-bootstrap';

class TourCreationTime extends React.Component{
  constructor() {
    super();

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this._emitSpecialHourChange = this._emitSpecialHourChange.bind(this)
    this._emitSpecialHourDateChange = this._emitSpecialHourDateChange.bind(this)
    this._changeLength = this._changeLength.bind(this)
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  next(){
    this.props.dispatch(setTabKey("photos"));
  }

  previous(){
    this.props.dispatch(setTabKey("title"));
  }

  _emitSpecialHourChange (newSpecialTimeState) {
    this.props.dispatch(updateSpecialTimeState(newSpecialTimeState))
  }

  _emitSpecialHourDateChange (newSpecialTimeDateState) {
    this.props.dispatch(updateSpecialTimeDateState(newSpecialTimeDateState))
  }

  _changeLength(event) {
    var len = Number(event.target.value)
    this._emitUserChange({...this.props.tour, length: len});
  }

  _emitUserChange (newLengthState) {
    this.props.dispatch(updateLengthState(newLengthState))
  }

  render(){
    const options = [ {value:0, optionName:"Select a time"},
                      {value:0.5, optionName:"30 Minutes"},
                      {value:1, optionName:"1 Hour"},
                      {value:1.5, optionName:"1 Hour 30 Minutes"},
                      {value:2, optionName:"2 Hours"},
                      {value:2.5, optionName:"2 Hours 30 Minutes"},
                      {value:3, optionName:"3 Hours"},
                      {value:3.5, optionName:"3 Hours 30 Minutes"},
                      {value:4, optionName:"4 Hours"},
                      {value:5, optionName:"5 Hours"},
                      {value:5.5, optionName:"5 Hour 30 Minutes"},
                      {value:6, optionName:"6 Hour"},
                      {value:6.5, optionName:"6 Hour 30 Minutes"},
                      {value:7, optionName:"7 Hours"},
                      {value:7.5, optionName:"7 Hours 30 Minutes"},
                      {value:8, optionName:"8 Hours"}];

    const dropdownOptions = options.map(function(option) {
      return (
        <option key={option.value} value={option.value}>{option.optionName}</option>
    )}, this);

    return (
      <div>
        <br/>
        <p className={style.HeaderStyle}>Choose a length for the tour</p>
        <br/>
          <Col xs={8} md={6}>
            <FormControl componentClass="select" onChange={this._changeLength} value={this.props.tour.length} >
              {dropdownOptions}
            </FormControl>
          </Col>
        <br/>
        <br/>
        <br/>
        <p className={style.HeaderStyle}>Select the dates you want to offer the tour. Then choose times for each day you select</p>
        <br />
        <MultiDateSelect
          emitChange={this._emitSpecialHourChange}
          emitDateChange={this._emitSpecialHourDateChange}
          dispatch={this.props.dispatch}
          hours_special={this.props.hours_special}
          hours_special_dates={this.props.hours_special_dates}
          base_hours={this.props.base_hours}/>
        <br/>
        <Pager>
          <Pager.Item previous onSelect={this.previous}>&larr; Go Back</Pager.Item>
          <Pager.Item next onSelect={this.next}>Next &rarr;</Pager.Item>
        </Pager>
      </div>
    )
  }
}

export default TourCreationTime;
