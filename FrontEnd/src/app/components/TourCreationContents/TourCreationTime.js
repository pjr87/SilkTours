import React from 'react';
import style from './style.css';
import {EditableField} from '../Forms/Forms.js';
import { Pager } from 'react-bootstrap';
import { updateTimeState, setTabKey } from '../../actions/TourCreationActions';
import DatePicker from 'react-datepicker'
import moment from 'moment';
require('react-datepicker/dist/react-datepicker-cssmodules.css');

class TourCreationTime extends React.Component{
  constructor() {
    super();

    this.state = {
      startDate: moment(),
      endDate: moment()
    }

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this._changeStartTime = this._changeStartTime.bind(this)
    this._changeEndTime = this._changeEndTime.bind(this)
    this.handleStartChange = this.handleStartChange.bind(this)
    this.handleEndChange = this.handleEndChange.bind(this)
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

  render(){
    return (
      <div>
        <br/>
        <p className={style.HeaderStyle}>What is the start and end date of the tour?</p>
        <br/>
        <EditableField label="Start" onChange={this._changeStartTime} value={this.props.tour.firstStart_date}/>
        <br/>
        <br/>
        <EditableField label="End" onChange={this._changeEndTime} value={this.props.tour.lastEnd_date}/>
        <br/>
        <br/>
        <DatePicker
          inline
          dateFormat="YYYY/MM/DD"
          selected={this.state.startDate}
          selectsStart  startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleStartChange} />
        <DatePicker
          inline
          dateFormat="YYYY/MM/DD"
          selected={this.state.endDate}
          selectsEnd  startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleEndChange} />
        <Pager>
          <Pager.Item previous onSelect={this.previous}>&larr; Go Back</Pager.Item>
          <Pager.Item next onSelect={this.next}>Next &rarr;</Pager.Item>
        </Pager>
      </div>
    )
  }
}

export default TourCreationTime;
