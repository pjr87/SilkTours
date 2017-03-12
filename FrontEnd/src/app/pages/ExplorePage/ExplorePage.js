import React from 'react';

import {SearchBar, PageTitle, BannerImage} from 'components';

// Explore page in ES6. Link has a location parameter.
class ExplorePage extends React.Component{
  render(){
    return (
      <div>
        <BannerImage/>
        <PageTitle title= "available tours"/>
        <SearchBar/>
      </div>
    );
  }
}

export default ExplorePage;
