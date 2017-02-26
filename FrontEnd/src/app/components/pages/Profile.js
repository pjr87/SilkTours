import React from 'react';
import style from '../../style/style.css';
import Header from '../header/Header';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'
import GetData from '../../utils/databaseFunctions';
import TourContainer from '../Tours/TourContainer';
import * as service from '../../ajaxServices/AjaxList';
import logoImg from '../../style/images/logo2.png';


class ProfileHeader extends React.Component{

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

        <TourContainer>{/*<div>
          <div className={style.formHeader}> {this.props.title}</div>
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
          </div>*/}</TourContainer>

    );
  }
}

class Profile extends React.Component{

  buttonHandler(val){
    this.setState( {tab:val} );
  }

  constructor(props) {
     super(props);
     // initializes component state
     this.state = {
         fetching: false, // tells whether the request is waiting for response or not
         user: [],
         tab:'saves',
         warningVisibility: false,
         authProfile: authStore.getProfile()
     };
  }

  //Before component mounts, check login state
  componentWillMount() {
    authStore.on("login", () => {
      this.state.authProfile = authStore.getProfile();
    })

    authStore.on("logout", () => {
      this.state.authProfile = authStore.getProfile();
    })
  }

  componentDidMount() {
     this.getUserInfo(1);
  }

  showWarning = () => {
     this.setState({
         warningVisibility: true
     });

     setTimeout(
         () => {
             this.setState({
                 warningVisibility: false
             });
         }, 1500
     );
  }

  getUserInfo = async (postId) => {
     this.setState({
         fetching: true
     });

     try {
         this.state.authProfile = authStore.getProfile();
         // wait for two promises
         const info = await Promise.all([
             service.getUser(this.state.authProfile.id_user)
         ]);

         const user = info[0].data;
         console.log("user: "+user);

         this.setState({
             user,
             fetching: false // done!
         });

     } catch(e) {
         // if err, stop at this point
         this.setState({
             fetching: false
         });
         this.showWarning();
     }
  }

  render(){
    const {fetching, user} = this.state;

    var userData = user;
    var tabPage = <div> </div>;
    if(this.state.tab == 'saves'){
      var tabPage = <ToursTab title="Tours Saved"> </ToursTab>;
    }
    else if (this.state.tab = 'trips') {
      var tabPage = <ToursTab title="Tours Taken"> </ToursTab>;
    }
    else {
      var tabPage = <div> </div>;
    }

    return (<div>
      <Header largeHeader={false} fileName={logoImg} />
      <ProfileHeader profilePicture={userData.profile_picture} name={userData.first_name+" "+userData.last_name} />
      <div className={style.mainBody}>
        <div className={style.profileButtonMenu}>
          <button id="firstButton" className={style.profileButtons} onClick={this.buttonHandler.bind(this,"messages")}>messages</button>
          <button className={style.profileButtons} onClick={this.buttonHandler.bind(this,'saves')}>saves</button>
          <button className={style.profileButtons} onClick={this.buttonHandler.bind(this,'trips')}>trips</button>

        </div>

      <div className={style.formSection}>

            {tabPage}
        </div>
      </div>

    </div>);
  }
}

export default Profile;
export {ProfileHeader};
