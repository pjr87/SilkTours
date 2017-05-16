import React from 'react';
import Style from './style.css';
import {SearchBar, PageTitle, BannerImage, PendingReview} from 'components';

import { connect } from 'react-redux';
import { searchTour } from '../../actions/SearchActions';

import explore from '../../style/images/explore.jpg';
import explorelogo from '../../style/images/explorelogo.png';
import Image from 'react-bootstrap/lib/Image';

// Explore page in ES6. Link has a location parameter.
class ExplorePage extends React.Component{

  componentWillMount(){
    // this.props.dispatch(searchTour(this.props.rating, this.props.priceMin, this.props.priceMax, this.props.keywords, "", "", this.props.page, this.props.page_size));
  }

  render(){
    const pendingReview = (this.props.loggedIn) ? (<PendingReview selectedPendingReview="0"/>) : null;
    return (
      <div>
        <div className = {Style.pane}>
          <div className= {Style.sideLeft}>
            <Image className="img-responsive" src={explorelogo}/>
              <p className = {Style.paneText}>Aenean sollicitudin, erat a elementum</p>
              <p className = {Style.paneText}>rutrum, neque sem pretium metus, quis</p>
              <p className = {Style.paneText}>mollis nisl nunc et massa. Vestibulum</p>
              <p className = {Style.paneText}>sed metus in lorem tristique</p>
              <p className = {Style.paneText}>ullamcorper id vitae erat. Nulla mollis</p>
              <p className = {Style.paneText}>sapien sollicitudin lacinia lacinia.</p>
          </div>
          <div className = {Style.sideRight}>
            <Image className="img-responsive" src={explore}/>
          </div>
        </div>
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
