import React from 'react';

import {BannerImage, PageTitle, SignInContents} from 'components';



class SignInPage extends React.Component{
  render(){
    return(
      <div>
        <BannerImage/>
        <PageTitle title = "Sign in!"/>
        <SignInContents/>
      </div>
    );
  }
}

export default SignInPage;
