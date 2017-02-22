import React from 'react';

import {Header, Footer, BannerImage, PageTitle, AboutContents} from 'components'

class AboutUsPage extends React.Component{
  render(){
    return(
      <div>
        <Header/>
        <BannerImage/>
        <PageTitle title= "mission statement"/>
        <br/>
        <br/>
        <PageTitle title= "introducing our team member"/>
        <AboutContents/>
        <Footer/>
      </div>
    );
  }
}

export default AboutUsPage;
