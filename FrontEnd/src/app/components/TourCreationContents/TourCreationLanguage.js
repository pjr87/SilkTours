import React from 'react';
import style from './style.css';

class TourCreationLanguage extends React.Component{
  constructor() {
    super();
  }

  render(){
    return (
      <div>
        <br/>
        <p className={style.HeaderStyle}>What language will the tour be?</p>
      </div>
    )
  }
}

export default TourCreationLanguage;
