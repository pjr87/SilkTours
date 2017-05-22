import React from 'react';
import {BannerImage, PageTitle, SignInContents} from 'components';

class SignInRedirectPage extends React.Component{
  render(){
    return(
      <div>
        <br/>
        <br/>
        <br/>
        <PageTitle title = "You must sign in before continuing to this part of the application!"/>
        <SignInContents/>
      </div>
    );
  }
}

export default SignInRedirectPage;
