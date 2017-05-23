import React from 'react';
import ReactDOM from 'react-dom';
import style from './style.css';
import {StaticField} from '../Forms/Forms.js';
import { Pager, HelpBlock } from 'react-bootstrap';
import { updatePhotoState, setTabKey, createTour } from '../../actions/TourCreationActions';

class TourCreationReview extends React.Component{
  constructor() {
    super();

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
  }

  next(){
    this.props.dispatch(createTour(
      this.props.tour,
      this.props.auth,
      this.props.photos,
      this.props.hours_special,
      this.props.base_hours))
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  previous(){
    this.props.dispatch(setTabKey("price"));
  }

  render(){
    let isLoading = this.props.currentlySending;
    function ErrorFunc(props){

      if( props.errorText ){
        return (<HelpBlock>{props.errorText}</HelpBlock>);
      }

      return <div></div>
    }

    return (
      <div>
        <br/>
        <p className={style.HeaderStyle}>Review and Submit!</p>
        <br/>
        <StaticField style={style.BodyStyle} label="Tour Name" value={this.props.tour.name} id="name" />
        <br/>
        <br/>
        <StaticField style={style.BodyStyle} label="City" value={this.props.tour.address.city} id="city" />
        <br/>
        <br/>
        <StaticField style={style.BodyStyle} label="State" value={this.props.tour.address.state_code} id="state_code" />
        <br/>
        <br/>
        <StaticField style={style.BodyStyle} label="Street" value={this.props.tour.address.street} id="street" />
        <br/>
        <br/>
        <StaticField style={style.BodyStyle} label="Zip Code" value={this.props.tour.address.zip} id="zip" />
        <br/>
        <br/>
        <StaticField style={style.BodyStyle} label="Min Group Size" value={this.props.tour.min_group_size} id="min_group_size" />
        <br/>
        <br/>
        <StaticField style={style.BodyStyle} label="Max Group Size" value={this.props.tour.max_group_size} id="max_group_size" />
        <br/>
        <br/>
        <StaticField style={style.BodyStyle} label="Description" value={this.props.tour.description} id="description" />
        <br/>
        <br/>
        <StaticField style={style.BodyStyle} label="Price per Person" value={this.props.tour.price} id="price" />
        <br/>
        <br/>
        <StaticField style={style.BodyStyle} label="Start Date" value={this.props.tour.firstStart_date} id="date" />
        <br/>
        <br/>
        <StaticField style={style.BodyStyle} label="End Date" value={this.props.tour.lastEnd_date} id="time" />
        <br/>
        <br/>
        <br/>
        <Pager>
          <Pager.Item previous onSelect={this.previous}>&larr; Go Back</Pager.Item>
          <Pager.Item next disabled={isLoading} onSelect={this.next}>{isLoading ? 'Creating Tour...' : 'Submit Tour!'} &rarr;</Pager.Item>
        </Pager>
        <ErrorFunc errorText = {this.props.errorMessage} />
      </div>
    )
  }
}

export default TourCreationReview;
