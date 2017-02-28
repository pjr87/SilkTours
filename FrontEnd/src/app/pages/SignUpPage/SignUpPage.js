import React from 'react';

import {BannerImage, PageTitle, SignUpContents} from 'components';

class SignUpPage extends React.Component{
  render(){
    return(
      <div>
        <BannerImage/>
        <PageTitle title = "create a travel profile"/>
        <SignUpContents/>
      </div>
    );
  }
}

export default SignUpPage;
