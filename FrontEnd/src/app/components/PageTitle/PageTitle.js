import React from 'react'
import style from './style.css';

class PageTitle extends React.Component{
  render(){
    return(
      <div>
        <p className={style.HeaderStyle}>{this.props.title}</p>
      </div>
    );
  }
}

export default PageTitle
