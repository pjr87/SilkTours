import React from 'react';

import {BannerImage, PageTitle, SignInContents} from 'components';

class NotFound extends React.Component{
  render(){
    return(
      <div>
        <BannerImage/>
        <PageTitle title = "Page Not Found!"/>
        <SignInContents/>
      </div>
    );
  }
}

export default NotFound;
