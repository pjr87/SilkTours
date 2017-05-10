import React from 'react';

import {SearchBar, PageTitle, BannerImage, PendingReview} from 'components';

import { connect } from 'react-redux';
import { searchTour } from '../../actions/SearchActions';

// Explore page in ES6. Link has a location parameter.
class ExplorePage extends React.Component{

  componentWillMount(){
    // this.props.dispatch(searchTour(this.props.rating, this.props.priceMin, this.props.priceMax, this.props.keywords, "", "", this.props.page, this.props.page_size));
  }

  render(){
    const pendingReview = (this.props.loggedIn) ? (<PendingReview selectedPendingReview="0"/>) : null;
    return (
      <div>
        <br/>
        <br/>
        <PageTitle title= "Available tours"/>
        {pendingReview}
        <SearchBar/>
      </div>
    );
  }
}

// select chooses which props to pull from store
function select(state) {
  return {
    loggedIn: state.AuthReducer.loggedIn,
    tours: state.SearchReducer.tours,
    keywords: state.SearchReducer.keywords,
    interests: state.SearchReducer.interests,
    rating: state.SearchReducer.rating,
    priceMin: state.SearchReducer.priceMin,
    priceMax: state.SearchReducer.priceMax,
    city: state.SearchReducer.city,
    page: state.SearchReducer.page,
    isLoaded: state.SearchReducer.isLoaded
  };
}

export default connect(select)(ExplorePage);
