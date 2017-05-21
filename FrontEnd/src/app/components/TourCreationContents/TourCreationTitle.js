import React from 'react';
import ReactDOM from 'react-dom';
import style from './style.css';
import {EditableFieldClass} from '../Forms/Forms.js';
import { Pager } from 'react-bootstrap';
import { updateNameState, setTabKey } from '../../actions/TourCreationActions';

class TourCreationTitle extends React.Component{
  constructor() {
    super();

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this._changeTour = this._changeTour.bind(this)
  }

  next(){
    this.props.dispatch(setTabKey("time"));
  }

  previous(){
    this.props.dispatch(setTabKey("language"));
  }

  _changeTour(event) {
    this._emitUserChange({...this.props.tour, name: event.target.value});
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  _emitUserChange (newTitleState) {
    this.props.dispatch(updateNameState(newTitleState))
  }

  render(){
    if(this.props.tour.name == ""){
      return (
        <div>
          <br/>
          <p className={style.HeaderStyle}>What is the title of the tour?</p>
          <br/>
          <EditableFieldClass style={style.BodyStyle} label="Title" onChange={this._changeTour} value={this.props.tour.name}/>
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
          <p className={style.HeaderStyle}>What is the title of the tour?</p>
          <br/>
          <EditableFieldClass style={style.BodyStyle} label="Title" onChange={this._changeTour} value={this.props.tour.name}/>
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

export default TourCreationTitle;
