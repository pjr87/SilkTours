import React from 'react';
import style from './style.css';
import {EditableFieldClass} from '../Forms/Forms.js';
import { Pager } from 'react-bootstrap';
import { updateLanguageState, setTabKey } from '../../actions/TourCreationActions';

class TourCreationLanguage extends React.Component{
  constructor() {
    super();

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this._changeTour = this._changeTour.bind(this)
  }

  next(){
    this.props.dispatch(setTabKey("title"));
  }

  previous(){
    this.props.dispatch(setTabKey("location"));
  }

  _changeTour(event) {
    this._emitUserChange({...this.props.tour, language: event.target.value});
  }

  _emitUserChange (newLanguageState) {
    this.props.dispatch(updateLanguageState(newLanguageState))
  }

  render(){
    if(this.props.tour.language != null || this.props.tour.language != ''){
      return (
        <div>
          <br/>
          <p className={style.HeaderStyle}>What language will the tour be in?</p>
          <br/>
          <EditableFieldClass style={style.BodyStyle} label="Language" onChange={this._changeTour} value={this.props.tour.language}/>
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
          <p className={style.HeaderStyle}>What language will the tour be in?</p>
          <br/>
          <EditableFieldClass style={style.BodyStyle} label="Language" onChange={this._changeTour} value=""/>
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

export default TourCreationLanguage;
