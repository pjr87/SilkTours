import React from 'react';

import {Header, Footer, BannerImage, PageTitle, ContactUsContents} from 'components'

class ContactUsPage extends React.Component{
  render(){
    return(
      <div>
        <Header/>
        <BannerImage/>
        <PageTitle title= "Contact Us"/>
        <br/>
        <br/>
        <ContactUsContents/>
        <Footer/>
      </div>
    );
  }
}

export default ContactUsPage;
