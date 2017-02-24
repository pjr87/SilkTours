import React from 'react';

import {Header, Footer, BannerImage, PageTitle, SignUpContents} from 'components';

class SignUpPage extends React.Component{
  render(){
    return(
      <div>
        <Header/>
        <BannerImage/>
        <PageTitle title = "create a travel profile"/>
        <SignUpContents/>
        <Footer/>
      </div>
    );
  }
}

export default SignUpPage;
