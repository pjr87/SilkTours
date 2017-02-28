import React from 'react';

import {BannerImage, PageTitle, ContactUsContents} from 'components'

class ContactUsPage extends React.Component{
  render(){
    return(

      <div>
        <br />
        <br />
        <br />
        <PageTitle title= "Contact Us"/>
        <br/>
        <br/>
        <ContactUsContents/>
      </div>
    );
  }
}

export default ContactUsPage;
