import React from 'react';
import style from './style.css';
import {EditableFieldClass} from '../Forms/Forms.js';
import {
  updateTimeState,
  setStartTime,
  setEndTime,
  setTabKey,
  updateSpecialTimeState,
  updateSpecialTimeDateState} from '../../actions/TourCreationActions';
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

  render(){
    return (
      <div>
        <br/>
        <p className={style.HeaderStyle}>What is the start and end date of the tour?</p>
        <br/>
        <br/>
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
