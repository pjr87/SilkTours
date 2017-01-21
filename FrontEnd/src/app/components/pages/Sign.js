/*
 Sign.js

 User sign in/up page, integration with FB, AWS
 Written by: Phillip Ryan

 Calls functions from CognitoSync folder to display login functions
 Displayed when Signin/Signup is clicke

 TODO:
  test
  add other social media integrations
*/

import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import {DeveloperAuth} from '../CognitoSync/DeveloperAuth.js'
import {AWSauth} from '../CognitoSync/AWSauth.js'
import appConfig from "../CognitoSync/config";
import AuthStore from "../../stores/AuthStore.js"
import logoImg from '../../style/images/logo5.png';

const responseFacebook = (response) => {
  //console.log(response);
  var AWSAuth = new AWSauth(response);
  AWSAuth.startAWS(response, "Facebook");
}

class Sign extends React.Component{
  //Define auth profile state
  constructor(){
    super();
    this.state = {
      authProfile: AuthStore.getProfile(), //Get current profile
    };
  }

  //Before component mounts, check login state
  componentWillMount() {
    AuthStore.on("login", () => {
      this.setState({
        authProfile: AuthStore.getProfile(),
      })
    })

    AuthStore.on("logout", () => {
      this.setState({
        authProfile: AuthStore.getProfile(), //Will return 0
      })
    })
  }

  render() {
    return (
      <div>
      <Header fileName={logoImg}/>

      <FacebookLogin
        appId={appConfig.facebookAppId}
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook} />

      <DeveloperAuth/>

      <Footer/>
      </div>
    );
  }
}

export default Sign;
