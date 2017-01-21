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
        <img src={this.props.tourPic} width="100px" height="100px" />
        <div className={style.tourName}>
          {this.props.tourName}this is the name of the tour.
        </div>
        <div>
          This is the tour discription!
        </div>
      </div>
    );
  }
}

class ToursTab extends React.Component{
  render(){

    return (
      <div>
        <Link
          to={{
            pathname: '/explore',
            query: { location: 'philadelphia' }
          }}>
        <div className = {style.exploreBox1}>
          <h6>philadelphia</h6>
        </div>
        </Link>
        <Link
          to={{
            pathname: '/explore',
            query: { location: 'newyork' }
          }}>
        <div className = {style.exploreBox2}>
          <h6>new york</h6>
        </div>
        </Link>
      </div>
    );
  }
}

class Profile extends React.Component{

  constructor(props){
    super(props);
    this.state={tab:'saves'};
  }

  buttonHandler(val){
    this.setState( {tab:val} );
  }

  render(){
    var userData = GetData.getUser(1);
    var tabPage = <div> </div>;
    if(this.state.tab == 'saves'){
      var tabPage = <ToursTab> </ToursTab>;
    }
    else if (this.state.tab = 'trips') {
      var tabPage = <ToursTab> </ToursTab>;
    }
    else {
      var tabPage = <div> </div>;
    }

    return (<div>
      <Header largeHeader={false} />
      <ProfileHeader profilePicture={userData.profile_picture} name={userData.first_name+" "+userData.last_name} />
      <div className={style.mainBody}>
        <div className={style.profileButtonMenu}>
          <button id="firstButton" className={style.profileButtons} onClick={this.buttonHandler.bind(this,"messages")}>messages</button>
          <button className={style.profileButtons} onClick={this.buttonHandler.bind(this,'saves')}>saves</button>
          <button className={style.profileButtons} onClick={this.buttonHandler.bind(this,'trips')}> trips</button>

        </div>
        {tabPage}
      <div className={style.formSection}>
          <div className={style.formHeader}> Tours Taken </div>
        </div>
      </div>

    </div>);
  }
}

export default Profile;
export {ProfileHeader};
