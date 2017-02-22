import React from 'react';

import {Header, Footer, BannerImage} from 'components';


// Activities page in ES6
class ActivitiesPage extends React.Component {
  render(){
    return (
      <div>
        <Header/>
        <BannerImage/>
        <Footer/>
      </div>
    )
  }
}

export default ActivitiesPage;
