import React from 'react';
import {BannerImage, PageTitle, SignUpContents} from 'components';

class SignUpPage extends React.Component{
  render(){
    return(
      <div>
        <br/>
        <br/>
        <br/>
        <PageTitle title = "Create a travel profile!"/>
        <SignUpContents/>
      </div>
    );
  }
}

export default SignUpPage;
