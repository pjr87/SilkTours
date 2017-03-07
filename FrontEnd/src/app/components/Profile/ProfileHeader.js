import React from 'react';
import style from './style.css';

export default class ProfileHeader extends React.Component{

  render(){
    return (<div className={style.profileHeader}>
      <div className={style.profileBox}>
        <div className={style.profileText}>
          profile
        </div>
        <img className={style.imgCircle} src={this.props.profilePicture} width="100px" height="100px" />
      </div>
      <div className={style.profileNameText}>{this.props.name}</div>
    </div>);
  }
}
 
