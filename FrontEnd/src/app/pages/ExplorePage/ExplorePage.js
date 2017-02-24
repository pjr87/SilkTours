import React from 'react';

import {Header, Footer, SearchBar, PageTitle, BannerImage, TourContainer} from 'components';

// Explore page in ES6. Link has a location parameter.
class ExplorePage extends React.Component{
  render(){
    return (
      <div>
        <Header/>
        <BannerImage/>
        <PageTitle title= "available tours"/>
        <SearchBar/>
        <TourContainer/>
        <Footer/>
      </div>
    );
  }
}

export default ExplorePage;
