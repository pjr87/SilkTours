import React from 'react';
import style from './style.css';
import {EditableField} from '../Forms/Forms.js';
import { Pager } from 'react-bootstrap';
import { updatePhotoState, setTabKey } from '../../actions/TourCreationActions';

class TourCreationPhotos extends React.Component{
  constructor() {
    super();

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this._changeStartTime = this._changeStartTime.bind(this)
  }

  next(){
    this.props.dispatch(setTabKey("description"));
  }

  previous(){
    this.props.dispatch(setTabKey("time"));
  }

  _changeStartTime(event) {
    this._emitUserChange({...this.props.tour, firstStart_date: event.target.value});
  }

  _emitUserChange (newTimeState) {
    this.props.dispatch(updateTimeState(newTimeState))
  }

  render(){
    return (
      <div>
        <br/>
        <p className={style.HeaderStyle}>Select some photos to upload with the tour!</p>
        <br/>
        <Pager>
          <Pager.Item previous onSelect={this.previous}>&larr; Go Back</Pager.Item>
          <Pager.Item next onSelect={this.next}>Next &rarr;</Pager.Item>
        </Pager>
      </div>
    )
  }
}

export default TourCreationPhotos;
