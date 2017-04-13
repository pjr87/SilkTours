import React from 'react';

import {SearchBar, PageTitle, BannerImage} from 'components';

import { connect } from 'react-redux';
import { searchTour } from '../../actions/SearchActions';

// Explore page in ES6. Link has a location parameter.
class ExplorePage extends React.Component{

  componentWillMount(){
    this.props.dispatch(searchTour(this.props.rating, this.props.priceMin, this.props.priceMax, this.props.keywords, "", "", "&page="+this.props.page, "&page_size="+this.props.page_size));
  }

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

// select chooses which props to pull from store
function select(state) {
  return {
    tours: state.SearchReducer.tours,
    keywords: state.SearchReducer.keywords,
    interests: state.SearchReducer.interests,
    rating: state.SearchReducer.rating,
    priceMin: state.SearchReducer.priceMin,
    priceMax: state.SearchReducer.priceMax,
    city: state.SearchReducer.city,
    page: state.SearchReducer.page,
    page_size: state.SearchReducer.page_size,
    isLoaded: state.SearchReducer.isLoaded
  };
}

export default connect(select)(ExplorePage);
