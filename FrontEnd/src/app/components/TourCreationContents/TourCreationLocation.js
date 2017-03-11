import React from 'react';
import style from './style.css';
import {EditableField} from '../Forms/Forms.js';
import { updateAddressState } from '../../actions/TourActions';
import { Pager } from 'react-bootstrap';


class TourCreationLocation extends React.Component{
  constructor() {
    super();

    this._changeLocation = this._changeLocation.bind(this)
  }

  _changeLocation(event) {
    this._emitUserChange({...this.props.tour.address, city: event.target.value});
  }

  _emitUserChange (newAddressState) {
    this.props.dispatch(updateAddressState(newAddressState))
  }

  render(){
    if(this.props.tour.address.city != ''){
      return (
        <div>
          <br/>
          <p className={style.HeaderStyle}>Ready to create a tour?</p>
          <p className={style.BodyStyle}>We will be begin by selecting a city</p>
          <br/>
          <EditableField label="City" onChange={this._changeLocation} value={this.props.tour.address.city}/>
          <Pager>
            <Pager.Item previous href="#">&larr; Previous Page</Pager.Item>
            <Pager.Item next href="#">Next Page &rarr;</Pager.Item>
          </Pager>
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
          <Pager>
            <Pager.Item previous href="#">&larr; Previous</Pager.Item>
            <Pager.Item disabled next href="#">Next &rarr;</Pager.Item>
          </Pager>
        </div>
      )
    }
  }
}

export default TourCreationLocation;
