import React from 'react';
import ReactDOM from 'react-dom';
import style from './style.css';
import {EditableFieldClass} from '../Forms/Forms.js';
import { Pager } from 'react-bootstrap';
import { updatePriceState, setTabKey, navAllowed } from '../../actions/TourCreationActions';

class TourCreationPrice extends React.Component{
  constructor() {
    super();

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this._changePrice = this._changePrice.bind(this)
  }

  next(){
    this.props.dispatch(setTabKey("review"));
    this.props.dispatch(navAllowed(true));
  }

  previous(){
    this.props.dispatch(setTabKey("additional"));
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  _changePrice(event) {
    if(!isNaN(event.target.value))
    {
       this._emitUserChange({...this.props.tour, price: event.target.value});
    }else{
       console.log("Not a number");
    }
  }

  _emitUserChange (newPriceState) {
    this.props.dispatch(updatePriceState(newPriceState))
  }

  render(){
    if(this.props.tour.price == "" || this.props.tour.price == 0){
      return (
        <div>
          <br/>
          <p className={style.HeaderStyle}>What will this tour cost?</p>
          <br/>
          <EditableFieldClass style={style.BodyStyle} label="Price" onChange={this._changePrice} value={this.props.tour.price}/>
          <br/>
          <Pager>
            <Pager.Item previous onSelect={this.previous}>&larr; Go Back</Pager.Item>
            <Pager.Item disabled next onSelect={this.next}>Next &rarr;</Pager.Item>
          </Pager>
        </div>
      )
    }
    else{
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
}

export default TourCreationPrice;
