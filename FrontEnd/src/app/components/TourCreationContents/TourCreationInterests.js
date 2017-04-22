import React from 'react';
import style from './style.css';
import {EditableFieldClass} from '../Forms/Forms.js';
import { Pager } from 'react-bootstrap';
import { updatePhotoState, setTabKey } from '../../actions/TourCreationActions';
import TourInterests from '../Interests/TourInterests';

class TourCreationInterests extends React.Component{
  constructor() {
    super();

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
  }

  next(){
    this.props.dispatch(setTabKey("stops"));
  }

  previous(){
    this.props.dispatch(setTabKey("description"));
  }

  render(){
    return (
      <div>
        <br/>
        <p className={style.HeaderStyle}>Please tag the tour with an interest!</p>
        <br/>
        <TourInterests tour={this.props.tour} dispatch={this.props.dispatch} />
        <Pager>
          <Pager.Item previous onSelect={this.previous}>&larr; Go Back</Pager.Item>
          <Pager.Item next onSelect={this.next}>Next &rarr;</Pager.Item>
        </Pager>
      </div>
    )
  }
}

export default TourCreationInterests;
