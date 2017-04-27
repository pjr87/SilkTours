import React from 'react';

import {PageTitle, ContactUsContents, TermsOfService} from 'components';



class TermsPage extends React.Component{
  render(){
    return(

      <div>
        <br />
        <br />
        <br />
        <PageTitle title= "Terms of Service"/>
        <br/>
        <br/>
        <TermsOfService />
      </div>
    );
  }
}

export default (TermsPage);
