import React from 'react';

import {BannerImage, PageTitle, ContactUsContents} from 'components';
import { connect } from 'react-redux';



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
        <ContactUsContents fullName={this.props.name} loggedIn={this.props.loggedIn} email={this.props.email} />
      </div>
    );
  }
}

// select chooses which props to pull from store
function select(state) {
  return {
    name: state.AuthReducer.user.fullName,
    email: state.AuthReducer.user.email,
    loggedIn: state.AuthReducer.loggedIn
  };
}

export default connect(select)(ContactUsPage);
