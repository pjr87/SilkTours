import React from 'react';
import {TourCreationContents} from 'components';

class TourCreationPage extends React.Component{


  componentDidMount () {
    window.scrollTo(0, 0)
  }
  render(){
    return(
      <div>
        <TourCreationContents/>
      </div>
    );
  }
}

export default TourCreationPage;
