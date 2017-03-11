import React from 'react';
import style from './style.css';
import {EditableField} from '../Forms/Forms.js';
import { updateAddressState } from '../../actions/TourActions';


class TourCreationLocation extends React.Component{
  constructor() {
    super();

    this._changeLocation = this._changeLocation.bind(this)
  }

  _changeLocation(event) {
    this._emitUserChange({...this.props.tour, first_name: event.target.value});
  }

  _emitUserChange (newAddressState) {
    this.props.dispatch(updateAddressState(newAddressState))
  }

  render(){
    if(this.props.tour.address != null){
      return (
        <div>
          <br/>
          <p className={style.HeaderStyle}>Ready to create a tour?</p>
          <p className={style.BodyStyle}>We will be begin by selecting a city</p>
          <br/>
          <EditableField label="City" onChange={this._changeLocation} value={this.props.tour.address.city}/>
        </div>
      )
    }
    else {
      return (
        <div>
          <br/>
          <p className={style.HeaderStyle}>Ready to create a tour?</p>
          <p className={style.BodyStyle}>We will be begin by selecting a city</p>
          <br/>
          <EditableField label="City" onChange={this._changeLocation} value=""/>
        </div>
      )
    }
  }
}

export default TourCreationLocation;
