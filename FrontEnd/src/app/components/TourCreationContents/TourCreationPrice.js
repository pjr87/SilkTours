import React from 'react';
import style from './style.css';
import {EditableFieldClass} from '../Forms/Forms.js';
import { Pager } from 'react-bootstrap';
import { updatePriceState, setTabKey } from '../../actions/TourCreationActions';

class TourCreationPrice extends React.Component{
  constructor() {
    super();

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this._changePrice = this._changePrice.bind(this)
  }

  next(){
    this.props.dispatch(setTabKey("review"));
  }

  previous(){
    this.props.dispatch(setTabKey("additional"));
  }

  _changePrice(event) {
    this._emitUserChange({...this.props.tour, price: event.target.value});
  }

  _emitUserChange (newPriceState) {
    this.props.dispatch(updatePriceState(newPriceState))
  }

  render(){
    return (
      <div>
        <br/>
        <p className={style.HeaderStyle}>What will this tour cost?</p>
        <br/>
        <EditableFieldClass style={style.BodyStyle} label="Price" onChange={this._changePrice} value={this.props.tour.price}/>
        <br/>
        <Pager>
          <Pager.Item previous onSelect={this.previous}>&larr; Go Back</Pager.Item>
          <Pager.Item next onSelect={this.next}>Next &rarr;</Pager.Item>
        </Pager>
      </div>
    )
  }
}

export default TourCreationPrice;
