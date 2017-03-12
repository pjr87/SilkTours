import React from 'react';
import style from './style.css';

class TourCreationInfo extends React.Component{
  constructor() {
    super();
  }

  render(){
    return (
      <div>
        <br/>
        <p className={style.HeaderStyle}>Ready to begin creating a tour?</p>
      </div>
    )
  }
}

export default TourCreationInfo;
