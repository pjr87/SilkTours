/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

// Import stuff
import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import { connect } from 'react-redux';
import auth from '../utils/cognitoFunctions';

class App extends Component {
  render() {
    return(
      <div className="wrapper">
        <NavBar loggedIn={this.props.data.loggedIn}
                history={this.props.history}
                location={this.props.location}
                dispatch={this.props.dispatch}
                currentlySending={this.props.data.currentlySending} />
        { this.props.children }

          <p>&#169;silk tours inc.</p>
      </div>
    )
  }
}

//export default App;

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
