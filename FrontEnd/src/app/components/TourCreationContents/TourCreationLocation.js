import React from 'react';
import style from './style.css';
import {EditableFieldClass} from '../Forms/Forms.js';
import { Pager } from 'react-bootstrap';
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
    if(this.props.tour.address.city != null || this.props.tour.address.city != ''){
      return (
        <div>
          <br/>
          <p className={style.HeaderStyle}>We will be begin by selecting a city</p>
          <br/>
          <EditableFieldClass style={style.BodyStyle} label="City" onChange={this._changeLocation} value={this.props.tour.address.city}/>
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
          <p className={style.BodyStyle}>We will be begin by selecting a city</p>
          <br/>
          <EditableFieldClass style={style.BodyStyle} label="City" onChange={this._changeLocation} value=""/>
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

export default TourCreationLocation;
