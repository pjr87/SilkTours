import React from 'react';
import style from './style.css';
import {EditableFieldClass} from '../Forms/Forms.js';
import {
  updateTimeState,
  setStartTime,
  setEndTime,
  setTabKey } from '../../actions/TourCreationActions';
import MultiDateSelect from '../Date/MultiDateSelect';
import moment from 'moment';
import {Grid, Col, Row, ControlLabel, Pager} from 'react-bootstrap';

class TourCreationTime extends React.Component{
  constructor() {
    super();

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this._changeStartTime = this._changeStartTime.bind(this)
    this._changeEndTime = this._changeEndTime.bind(this)
    this.handleStartChange = this.handleStartChange.bind(this)
    this.handleEndChange = this.handleEndChange.bind(this)
    this.onStartChange = this.onStartChange.bind(this)
    this.onEndChange = this.onEndChange.bind(this)
  }

  handleStartChange(date) {
    console.log("start day", date._d.getDate());
    console.log("start month", date._d.getMonth()+1);
    console.log("start year", date._d.getFullYear());
    let startDate =  date._d.getFullYear() +  "-" + (date._d.getMonth()+1) + "-" + date._d.getDate()
    console.log("start full", startDate);
    this.setState({
      startDate: date
    });
    this._emitUserChange({...this.props.tour, firstStart_date: startDate});
  }

  handleEndChange(date) {
    console.log("end date", date);
    let endDate =  date._d.getFullYear() +  "-" + (date._d.getMonth()+1) + "-" + date._d.getDate()
    this.setState({
      endDate: date
    });
    this._emitUserChange({...this.props.tour, lastEnd_date: endDate});
  }

  next(){
    this.props.dispatch(setTabKey("photos"));
  }

  previous(){
    this.props.dispatch(setTabKey("title"));
  }

  _changeStartTime(event) {
    this._emitUserChange({...this.props.tour, firstStart_date: event.target.value});
  }

  _changeEndTime(event) {
    this._emitUserChange({...this.props.tour, lastEnd_date: event.target.value});
  }

  _emitUserChange (newTimeState) {
    this.props.dispatch(updateTimeState(newTimeState))
  }

  onStartChange(time) {
    this.props.dispatch(setStartTime(time));
  }

  onEndChange(time) {
    this.props.dispatch(setEndTime(time));
  }

  render(){
    return (
      <div>
        <br/>
        <p className={style.HeaderStyle}>What is the start and end date of the tour?</p>
        <br/>
        <br/>
        <MultiDateSelect/>
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
