import React from 'react';
import style from './style.css';
import {EditableFieldClass} from '../Forms/Forms.js';
import { Pager } from 'react-bootstrap';
import { updateStopState, setTabKey } from '../../actions/TourCreationActions';
import StopDisplay from '../StopDisplay/StopDisplay';

class TourCreationStops extends React.Component{
  constructor() {
    super();

    console.log("TourCreationStops");

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.updateStops = this.updateStops.bind(this)
  }

  next(){
    this.props.dispatch(setTabKey("additional"));
  }

  previous(){
    this.props.dispatch(setTabKey("interests"));
  }

  updateStops(s) {
    this._emitUserChange({...this.props.tour, stops: s});
  }

  _emitUserChange (newStopsState) {
    this.props.dispatch(updateStopState(newStopsState))
  }

  componentDidMount(){
    console.log("componentDidMount");
  }

  componentWillMount(){
    console.log("componentWillMount");
  }

  render(){
    return (
      <div>
        <br/>
        <p className={style.HeaderStyle}>Choose the locations this tour will stop.</p>
        <br/>
        <StopDisplay stops={this.props.tour.stops} updateStops={this.updateStops} />
        <br/>
        <Pager>
          <Pager.Item previous onSelect={this.previous}>&larr; Go Back</Pager.Item>
          <Pager.Item next onSelect={this.next}>Next &rarr;</Pager.Item>
        </Pager>
      </div>
    )
  }
}

TourCreationStops.propTypes = {
  photos: React.PropTypes.object
}

function select (state) {
  return {
    photos: state.TourCreationReducer.photos
  };
}

export default connect(select)(TourCreationStops);
