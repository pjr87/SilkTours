import React from 'react';

import {PageTitle, AboutContents} from 'components'

class AboutUsPage extends React.Component{
  render(){
    return(
      <div>
        <br/>
        <br/>
        <PageTitle title= "Mission Statement"/>
        <br/>
        <br/>
        <PageTitle title= "Introducing our team members"/>
        <AboutContents/>
      </div>
    );
  }
}

export default AboutUsPage;
