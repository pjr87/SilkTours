import React from 'react';
import ReactDOM from 'react-dom';
import style from './style.css';
import { updateGuideState, setTabKey } from '../../actions/TourCreationActions';
import { Pager } from 'react-bootstrap';

class TourCreationInfo extends React.Component{
  constructor() {
    super();

    this.next = this.next.bind(this)
    this.addGuide = this.addGuide.bind(this)
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  addGuide(){
    var guides = this.props.tour.guides;
    var guide = {
      first_name: this.props.user.first_name,
      id_user: this.props.user.id_users,
      last_name: this.props.user.last_name
    };

    guides.push(guide);
    console.log("guides", guides);
    this.updateGuides(guides);
  }

  updateGuides(g) {
    this._emitUserChange({...this.props.tour, guides: g});
  }

  _emitUserChange (newGuideState) {
    this.props.dispatch(updateGuideState(newGuideState))
  }

  next(){
    this.addGuide();
    this.props.dispatch(setTabKey("location"));
  }

  render(){
    return (
      <div>
        <br/>
        <p className={style.HeaderStyle}>Ready to begin creating a tour?</p>
        <br/>
        <Pager>
          <Pager.Item next onSelect={this.next}>Begin! &rarr;</Pager.Item>
        </Pager>
      </div>
    )
  }
}

export default TourCreationInfo;
