/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

// Import stuff
import React, { Component } from 'react';
import { Link } from 'react-router';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import { connect } from 'react-redux';
import style from './style.css';

class App extends Component {
  render() {
    return(
      <div className="wrapper" style={{"height":"100%"}}>
        <NavBar loggedIn={this.props.loggedIn}
                usersName={this.props.firstName}
                isGuide={this.props.isGuide}
                currentlySending={this.props.currentlySending}
                history={this.props.history}
                location={this.props.location}
                dispatch={this.props.dispatch}/>
        <div style={{"minHeight": "60%"}} >
        { this.props.children }
        </div>
        <Footer style={{"minHeight":"30%"}} location={this.props.location} brandName={"Silk Tours Inc."}/>
      </div>
    )
  }
}

App.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  currentlySending: React.PropTypes.bool,
  firstName: React.PropTypes.string,
  isGuide: React.PropTypes.bool,
  history: React.PropTypes.object,
  location: React.PropTypes.object,
  children: React.PropTypes.object,
  dispatch: React.PropTypes.func
}

// select chooses which props to pull from store
function select(state) {
  return {
    loggedIn: state.AuthReducer.loggedIn,
    currentlySending: state.AuthReducer.currentlySending,
    firstName: state.AuthReducer.user.first_name,
    isGuide: state.AuthReducer.user.is_guide
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
