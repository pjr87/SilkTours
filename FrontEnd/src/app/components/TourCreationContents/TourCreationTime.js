import React from 'react';
import style from './style.css';
import {EditableFieldClass} from '../Forms/Forms.js';
import { Pager } from 'react-bootstrap';
import { updateTimeState, setStartTime, setEndTime, setTabKey } from '../../actions/TourCreationActions';
import DatePicker from 'react-datepicker'
import moment from 'moment';
import {Grid, Col, Row, ControlLabel} from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';
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
    const format = 'h:mm a';
    const now = moment().hour(0).minute(0);

    return (
      <div>
        <br/>
        <p className={style.HeaderStyle}>What is the start and end date of the tour?</p>
        <br/>
        <EditableFieldClass style={style.BodyStyle} label="Start Date" onChange={this._changeStartTime} value={this.props.tour.firstStart_date}/>
        <br/>
        <Col smOffset={4} sm={10}>
          <DatePicker
            inline
            dateFormat="YYYY/MM/DD"
            selected={this.state.startDate}
            selectsStart  startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleStartChange}
            popoverAttachment="bottom center"
            popoverTargetAttachment="top center" />
        </Col>
        <TimePicker onChange={this.onStartChange} value={this.props.startTime}/>
        <EditableFieldClass style={style.BodyStyle} label="End Date" onChange={this._changeEndTime} value={this.props.tour.lastEnd_date}/>
        <br/>
        <Col smOffset={4} sm={10}>
          <DatePicker
            inline
            dateFormat="YYYY/MM/DD"
            selected={this.state.endDate}
            selectsEnd  startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleEndChange} />
        </Col>
        <TimePicker onChange={this.onEndChange} value={this.props.endTime}/>
        <br/>
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
