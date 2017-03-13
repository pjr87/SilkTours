import React from 'react';

import {BannerImage, PageTitle, TourConfirmationContents} from 'components';

class TourConfirmationPage extends React.Component{
  render(){
    return(
      <div>
        <BannerImage/>
        <PageTitle title = "Confirm your reservation"/>
        <TourConfirmationContents/>
      </div>
    );
  }
}

export default TourConfirmationPage;
