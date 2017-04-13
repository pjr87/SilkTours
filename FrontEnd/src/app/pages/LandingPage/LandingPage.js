import React from 'react';
import {BannerImage} from 'components';
import {connect} from 'react-redux';

// Explore page in ES6. Link has a location parameter.

/*

news about silk, promote brand, video,
about company, founders, mission statement,
who supports us, why we are doing this, How you can join, View tours*/

class LandingPage extends React.Component{

  render(){
    return (
      <div>
        <br/>
        <br/>
        <BannerImage/>
      </div>
    );
  }
}

// select chooses which props to pull from store
function select(state) {
  return {
  };
}

export default connect(select)(LandingPage);
