import React from 'react';

import PageHeader from 'react-bootstrap/lib/PageHeader';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from 'react-bootstrap/lib/Button';
import Pager from 'react-bootstrap/lib/Pager';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

import TourContainer from '../Tours/TourFilteredContainer'
import { setSelectedKeywords, setSelectedRating, setSelectedPriceMin, setSelectedPriceMax, setSelectedCity, setSelectedInterests, searchTour } from '../../actions/SearchActions';

class SearchBar extends React.Component{
  constructor(props){
    super();
    this.state = {
      rating: props.rating,
      priceMin: props.priceMin,
      priceMax: props.priceMax,
      keywords: props.keywords,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handlePriceMinChange = this.handlePriceMinChange.bind(this);
    this.handlePriceMaxChange = this.handlePriceMaxChange.bind(this);
    this.handleKeywordsChange = this.handleKeywordsChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.dispatch(setSelectedRating(this.state.rating))
    this.props.dispatch(setSelectedPriceMin(this.state.priceMin))
    this.props.dispatch(setSelectedPriceMax(this.state.priceMax))
    this.props.dispatch(setSelectedKeywords(this.state.keywords))
    this.props.dispatch(searchTour(this.state.rating, this.state.priceMin, this.state.priceMax, this.state.keywords, "", ""));
  }

  handleRatingChange(e) {
    this.setState({ rating: e.target.value });
  }
  handlePriceMinChange(e) {
    this.setState({ priceMin: e.target.value });
  }
  handlePriceMaxChange(e) {
    this.setState({ priceMax: e.target.value });
  }
  handleKeywordsChange(e) {
    this.setState({ keywords: e.target.value });
  }

  render(){
    return(
      <div>
        <Pager>
          <Form inline onSubmit={this.handleSubmit}>
            <FormGroup controlId="search">
              <ControlLabel>Search</ControlLabel>
              {'  '}
              <FormControl value={this.state.keywords}
                onChange={this.handleKeywordsChange}/>
            </FormGroup>
            &nbsp;&nbsp;&nbsp;
            <FormGroup controlId="rating">
              <ControlLabel>Rating</ControlLabel>
              {'  '}
              <FormControl componentClass="select" placeholder="select" value={this.state.rating}
                onChange={this.handleRatingChange}>
                <option value="0">0+</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </FormControl>
            </FormGroup>
            &nbsp;&nbsp;&nbsp;
            <FormGroup controlId="priceMin">
              <ControlLabel>Minimum Price</ControlLabel>
              {'  '}
              <FormControl componentClass="select" placeholder="select" value={this.state.priceMin}
                onChange={this.handlePriceMinChange}>
                <option value="0">$0</option>
                <option value="10">$10</option>
                <option value="20">$20</option>
                <option value="30">$30</option>
                <option value="40">$40</option>
                <option value="50">$50</option>
                <option value="60">$60</option>
                <option value="70">$70</option>
                <option value="80">$80</option>
                <option value="90">$90</option>
                <option value="100">$100</option>
              </FormControl>
            </FormGroup>
            &nbsp;&nbsp;&nbsp;
            <FormGroup controlId="priceMin">
              <ControlLabel>Maximum Price</ControlLabel>
              {'  '}
              <FormControl componentClass="select" placeholder="select" value={this.state.priceMax}
                onChange={this.handlePriceMaxChange}>
                <option value="20">$20</option>
                <option value="40">$40</option>
                <option value="60">$60</option>
                <option value="80">$80</option>
                <option value="100">$100</option>
                <option value="1000000">$100+</option>
              </FormControl>
            </FormGroup>
            &nbsp;&nbsp;&nbsp;
            <Button type="submit">
              Search
            </Button>
          </Form>
          <br/>
        </Pager>
        <TourContainer rating={this.state.ratingProp} priceMin={this.state.priceMinProp} priceMax={this.state.priceMaxProp} keywords={this.state.keywordsProp}/>
      </div>
    );
  }
}

SearchBar.propTypes = {
  tours: React.PropTypes.array,
  keywords: React.PropTypes.string,
  interests: React.PropTypes.string,
  rating: React.PropTypes.string,
  priceMin: React.PropTypes.string,
  priceMax: React.PropTypes.string,
  city: React.PropTypes.string,
  isLoaded: React.PropTypes.bool
}

function select (state) {
  return {
    tours: state.SearchReducer.tours,
    keywords: state.SearchReducer.keywords,
    interests: state.SearchReducer.interests,
    rating: state.SearchReducer.rating,
    priceMin: state.SearchReducer.priceMin,
    priceMax: state.SearchReducer.priceMax,
    city: state.SearchReducer.city,
    isLoaded: state.SearchReducer.isLoaded
  };
}

export default connect(select)(SearchBar);
