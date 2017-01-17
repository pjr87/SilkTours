import React from 'react';
import style from './style/style.css';
import Header from './Header';

import GetData from '../databaseFunctions';

class ProfileHeader extends React.Component{

  render(){
    return (<div className={style.profileHeader}>
      <div className={style.profileText}>
        profile
        <img className={style.imgCircle} src={this.props.profilePicture} width="100px" height="100px" />
      </div>
      <div className={style.profileNameText}>{this.props.name}</div>
    </div>);
  }
}

class TourTile extends React.Component{

  render(){
    return (
      <div>
        <img className={style.imgCircle} src={this.props.tourPic} width="100px" height="100px" />


      </div>
    );
  }
}

class Profile extends React.Component{




  render(){
    var userData = GetData.getUser(1);

    return (<div>
      <Header largeHeader={false} />
      <ProfileHeader profilePicture={userData.profile_picture} name={userData.first_name+" "+userData.last_name} />
      <div className={style.mainBody}>
      <div className={style.formSection}>
          <div className={style.formHeader}> Tours Taken </div>
        </div>
      </div>

    </div>);
  }
}

export default Profile;
export {ProfileHeader};
