import React from 'react';
import style from './style.css';
import {EditableFieldClass} from '../Forms/Forms.js';
import {Pager, Col, Row, Grid, FormControl} from 'react-bootstrap';
import { updateDescriptionState, setTabKey } from '../../actions/TourCreationActions';

class TourCreationDescription extends React.Component{
  constructor() {
    super();

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this._changeDescription = this._changeDescription.bind(this)
  }

  next(){
    this.props.dispatch(setTabKey("interests"));
  }

  previous(){
    this.props.dispatch(setTabKey("photos"));
  }

  _changeDescription(event) {
    this._emitUserChange({...this.props.tour, description: event.target.value});
  }

  _emitUserChange (newDescriptionState) {
    this.props.dispatch(updateDescriptionState(newDescriptionState))
  }

  render(){
    if(this.props.tour.description == ""){
      return (
        <div>
          <br/>
          <p className={style.HeaderStyle}>Please describe the tour.</p>
          <br/>
            <Col xs={8} md={6} >
                  <FormControl style={{resize: "vertical"}} componentClass="textarea" onChange={this._changeDescription} value={this.props.tour.description} />
            </Col>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
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
          <p className={style.HeaderStyle}>Please describe the tour.</p>
          <br/>
            <Col xs={8} md={6} >
                  <FormControl style={{resize: "vertical"}} componentClass="textarea" onChange={this._changeDescription} value={this.props.tour.description} />
            </Col>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
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

export default TourCreationDescription;
