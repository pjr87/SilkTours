import React from 'react';
import ReactDOM from 'react-dom';
import style from './style.css';
import {EditableFieldClass} from '../Forms/Forms.js';
import { Pager } from 'react-bootstrap';
import { updateAdditionalState, setTabKey } from '../../actions/TourCreationActions';

class TourCreationAdditional extends React.Component{
  constructor() {
    super();

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this._changeAccomodation = this._changeAccomodation.bind(this)
    this._changeFood = this._changeFood.bind(this)
    this._changeTransport = this._changeTransport.bind(this)
  }

  next(){
    this.props.dispatch(setTabKey("price"));
  }

  previous(){
    this.props.dispatch(setTabKey("stops"));
    window.location.reload();
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  _changeAccomodation(event) {
    this._emitUserChange({...this.props.tour, additional_accomadation: event.target.value});
  }

  _changeFood(event) {
    this._emitUserChange({...this.props.tour, additional_food: event.target.value});
  }

  _changeTransport(event) {
    this._emitUserChange({...this.props.tour, additional_transport: event.target.value});
  }

  _emitUserChange (newAdditionalState) {
    this.props.dispatch(updateAdditionalState(newAdditionalState))
  }

  render(){
    return (
      <div>
        <br/>
        <p className={style.HeaderStyle}>Will you offer any additional services?</p>
        <br/>
        <EditableFieldClass style={style.BodyStyle} label="Accommodation" onChange={this._changeAccomodation} value={this.props.tour.additional_accomadation}/>
        <br/>
        <br/>
        <EditableFieldClass style={style.BodyStyle} label="Food" onChange={this._changeFood} value={this.props.tour.additional_food}/>
        <br/>
        <br/>
        <EditableFieldClass style={style.BodyStyle} label="Transport" onChange={this._changeTransport} value={this.props.tour.additional_transport}/>
        <br/>
        <Pager>
          <Pager.Item previous onSelect={this.previous}>&larr; Go Back</Pager.Item>
          <Pager.Item next onSelect={this.next}>Next &rarr;</Pager.Item>
        </Pager>
      </div>
    )
  }
}

export default TourCreationAdditional;
