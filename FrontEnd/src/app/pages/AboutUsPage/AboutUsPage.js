import React from 'react';

import {BannerImage, PageTitle, AboutContents} from 'components'

class AboutUsPage extends React.Component{
  render(){
    return(
      <div>
        <BannerImage/>
        <PageTitle title= "mission statement"/>
        <br/>
        <br/>
        <PageTitle title= "introducing our team member"/>
        <AboutContents/>
      </div>
    );
  }
}

export default AboutUsPage;
