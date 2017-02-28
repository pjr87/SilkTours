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
import { connect } from 'react-redux';
import style from './style.css';

class App extends Component {
  render() {
    return(
      <div className="wrapper">
        <NavBar loggedIn={this.props.loggedIn}
                usersName={this.props.usersName}
                currentlySending={this.props.currentlySending}
                history={this.props.history}
                location={this.props.location}
                dispatch={this.props.dispatch}/>
        { this.props.children }
        <div className={style.centerStuff}>
          <p className= {style.Footer}><Link to='/contactus'>Contact us</Link></p>
          <p className = {style.Footer}>&#169;silk tours inc.</p>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  currentlySending: React.PropTypes.bool,
  usersName: React.PropTypes.string,
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
    usersName: state.AuthReducer.user.fullName
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
