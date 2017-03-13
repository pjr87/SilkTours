import React from 'react';
import style from './style.css';
import {EditableField} from '../Forms/Forms.js';
import { Pager } from 'react-bootstrap';
import { updateTimeState, setTabKey } from '../../actions/TourCreationActions';

class TourCreationTime extends React.Component{
  constructor() {
    super();

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this._changeTour = this._changeTour.bind(this)
  }

  next(){
    this.props.dispatch(setTabKey("photos"));
  }

  previous(){
    this.props.dispatch(setTabKey("title"));
  }

  _changeTour(event) {
    this._emitUserChange({...this.props.tour, firstStart_date: event.target.value});
    this._emitUserChange({...this.props.tour, lastEnd_date: event.target.value});
  }

  _emitUserChange (newTimeState) {
    this._emitUserChange({...this.props.tour, firstStart_date: event.target.value});
    this._emitUserChange({...this.props.tour, lastEnd_date: event.target.value});
  }

  render(){
    if((this.props.tour.firstStart_date != null || this.props.tour.firstStart_date != '') &&
      (this.props.tour.lastEnd_date != null || this.props.tour.lastEnd_date != '')){
      return (
        <div>
          <br/>
          <p className={style.HeaderStyle}>What is the start and end date of the tour?</p>
          <br/>
          <EditableField label="Start" onChange={this._changeTour} value={this.props.tour.firstStart_date}/>
          <EditableField label="End" onChange={this._changeTour} value={this.props.tour.lastEnd_date}/>
          <br/>
          <Pager>
            <Pager.Item previous onSelect={this.previous}>&larr; Go Back</Pager.Item>
            <Pager.Item next onSelect={this.next}>Next &rarr;</Pager.Item>
          </Pager>
        </div>
      )
    }
    else {
      return (
        <div>
          <br/>
          <p className={style.HeaderStyle}>What is the start and end date of the tour?</p>
          <br/>
            <EditableField label="Start" onChange={this._changeTour} value=""/>
            <EditableField label="End" onChange={this._changeTour} value=""/>
            <br/>
            <Pager>
              <Pager.Item previous onSelect={this.previous}>&larr; Go Back</Pager.Item>
              <Pager.Item disabled next onSelect={this.next}>Next &rarr;</Pager.Item>
            </Pager>
        </div>
      )
    }
  }
}

export default TourCreationTime;
