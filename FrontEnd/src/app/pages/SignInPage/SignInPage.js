import React from 'react';

import {Header, Footer, BannerImage, PageTitle, SignInContents} from 'components';



class SignInPage extends React.Component{
  render(){
    return(
      <div>
        <Header/>
        <BannerImage/>
        <PageTitle title = "sign in"/>
        <SignInContents/>
        <Footer/>
      </div>
    );
  }
}

export default SignInPage;
