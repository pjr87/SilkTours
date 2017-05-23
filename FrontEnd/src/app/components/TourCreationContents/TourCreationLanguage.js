import React from 'react';
import ReactDOM from 'react-dom';
import style from './style.css';
import {Pager, Col, Row, Grid, FormControl} from 'react-bootstrap';
import { updateLanguageState, setTabKey } from '../../actions/TourCreationActions';

class TourCreationLanguage extends React.Component{
  constructor() {
    super();

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this._changeTour = this._changeTour.bind(this)
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
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
    const options = [ {value:"null", optionName:"Select a Language"},
                      {value:"English", optionName:"English"},
                      {value:"Spanish", optionName:"Spanish"},
                      {value:"French", optionName:"French"} ];

    const dropdownOptions = options.map(function(option) {
      return (
        <option key={option.value} value={option.value}>{option.optionName}</option>
    )}, this);

    if(this.props.tour.language == "null"){
      return (
        <div>
          <br/>
          <p className={style.HeaderStyle}>What language will the tour be in?</p>
          <br/>
            <Col xs={8} md={6}>
              <FormControl componentClass="select" onChange={this._changeTour} value={this.props.tour.language} >
                {dropdownOptions}
              </FormControl>
            </Col>
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
          <p className={style.HeaderStyle}>What language will the tour be in?</p>
          <br/>
            <Col xs={8} md={6}>
              <FormControl componentClass="select" onChange={this._changeTour} value={this.props.tour.language} >
                {dropdownOptions}
              </FormControl>
            </Col>
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

export default TourCreationLanguage;
