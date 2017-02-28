/*
 Sign.js

 User sign in page, integration with FB, AWS
 Written by: Phillip Ryan

 Calls functions from CognitoSync folder to display login functions
 Displayed when Signin is click

 TODO:
  Link back to the home page after sign up
  Add Signin from exisiting user account sequence for (devAuth, Facebook, other)
*/

import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss, Redirect } from 'react-router';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import auth from '../../utils/cognitoFunctions';
import { login } from '../../actions/AuthActions';

class SignInContents extends React.Component{
  constructor(){
    super();
  }

  render() {
    const dispatch = this.props.dispatch;
		const { formState, currentlySending } = this.props.data;

    return (
      <div>
        <br/>
        <br/>
        <div className="form-page__wrapper">
				  <div className="form-page__form-wrapper">
					  <div className="form-page__form-header">
						  <h2 className="form-page__form-heading">Login</h2>
				    </div>
  					{/* While the form is sending, show the loading indicator,
  						otherwise show "Log in" on the submit button */}
  		    	<LoginForm data={formState} dispatch={dispatch} location={location} history={this.props.history} onSubmit={::this._login} btnText={"Login"} currentlySending={currentlySending}/>
				  </div>
			  </div>
        <br/>
        <br/>
        <br/>
        <p>Don't have one?</p>
        <Link to='/signup'>CREATE ONE</Link>
        <br/>
        <br/>
      </div>
    );
  }
  _login(username, password) {
    this.props.dispatch(login(username, password));
  }
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(SignInContents);

//export default SignInContents;
