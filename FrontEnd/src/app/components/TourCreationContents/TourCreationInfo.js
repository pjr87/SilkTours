import React from 'react';
import style from './style.css';
import { setTabKey } from '../../actions/TourCreationActions';
import { Pager } from 'react-bootstrap';

class TourCreationInfo extends React.Component{
  constructor() {
    super();

    this.next = this.next.bind(this)
  }

  next(){
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
