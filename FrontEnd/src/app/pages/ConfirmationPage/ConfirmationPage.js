import React from 'react';

import {BannerImage, PageTitle, ConfirmationContents} from 'components';

class ConfirmationPage extends React.Component{
  render(){
    return(
      <div>
        <PageTitle title = "Confirm your new account!"/>
        <ConfirmationContents/>
      </div>
    );
  }
}

export default ConfirmationPage;
