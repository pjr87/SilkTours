import React from 'react';

import {PageTitle, ContactUsContents, Privacy} from 'components';



class PrivacyPage extends React.Component{
  render(){
    return(

      <div>
        <br />
        <br />
        <br />
        <PageTitle title= "Privacy Policy"/>
        <br/>
        <br/>
        <Privacy />
      </div>
    );
  }
}

export default (PrivacyPage);
