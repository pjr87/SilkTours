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
        <ContactUsContents fname={this.props.fname} lname={this.props.lname} loggedIn={this.props.loggedIn} email={this.props.email} />
      </div>
    );
  }
}

// select chooses which props to pull from store
function select(state) {
  return {
    fname: state.AuthReducer.user.first_name,
    lname: state.AuthReducer.user.last_name,
    email: state.AuthReducer.user.email,
    loggedIn: state.AuthReducer.loggedIn
  };
}

export default connect(select)(ContactUsPage);
