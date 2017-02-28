import React, { Component } from 'react';
import { Link } from 'react-router';

class NotFound extends Component {
  render() {
    return(
      <div>
        <br/>
        <br/>
          <br/>
          <br/>
        <h1>Page not found.</h1>
        <Link to="/" className="btn">Home</Link>
      </div>
    );
  }
}

export default NotFound;
