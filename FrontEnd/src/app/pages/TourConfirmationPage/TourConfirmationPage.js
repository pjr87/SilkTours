import React from 'react';

import {BannerImage, PageTitle, ConfirmationContents} from 'components';

class TourConfirmationPage extends React.Component{
  render(){
    return(
      <div>
        <BannerImage/>
        <PageTitle title = "Confirm your reservation"/>
      </div>
    );
  }
}

export default TourConfirmationPage;
