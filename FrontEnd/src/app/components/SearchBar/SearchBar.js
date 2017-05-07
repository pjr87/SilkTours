import React from 'react';
import style from './style.css';

import PageHeader from 'react-bootstrap/lib/PageHeader';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from 'react-bootstrap/lib/Button';
import Pager from 'react-bootstrap/lib/Pager';
import Pagination from 'react-bootstrap/lib/Pagination';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

import ToursList from '../Tours/ToursList';
import { setSelectedKeywords, setSelectedRating, setSelectedPriceMin, setSelectedPriceMax, setSelectedCity, setSelectedInterests, searchTour, setSelectedPage, setSelectedPageSize } from '../../actions/SearchActions';

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
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleKeywordsChange = this.handleKeywordsChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.nc = this.numColumns();
    window.addEventListener("resize", this.handlePageSizeChange);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.dispatch(setSelectedRating(this.state.rating))
    this.props.dispatch(setSelectedPriceMin(this.state.priceMin))
    this.props.dispatch(setSelectedPriceMax(this.state.priceMax))
    this.props.dispatch(setSelectedKeywords(this.state.keywords))
    this.props.dispatch(searchTour(this.state.rating, this.state.priceMin, this.state.priceMax, this.state.keywords, "", "", "", ""));
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
  handlePageSizeChange(e) {
    var _nc = this.numColumns()
    if (_nc == this.nc) return;
    this.nc = _nc;
    this.forceUpdate();
    this.props.dispatch(setSelectedPageSize(e.target.value));
    this.props.dispatch(searchTour(this.state.rating, this.state.priceMin, this.state.priceMax, this.state.keywords, "", "", this.props.page, e.target.value));
  }
  handlePageChange(e) {
    this.props.dispatch(setSelectedPage(e-1));
    this.props.dispatch(searchTour(this.state.rating, this.state.priceMin, this.state.priceMax, this.state.keywords, "", "", e-1, this.props.page_size));
  }
  render(){
    var colTours = this.getTourList(this.props.tours);
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
          <Form inline>
          <FormGroup controlId="page_size">
            <ControlLabel>View by</ControlLabel>
            {'  '}
            <FormControl componentClass="select" placeholder="select" value={this.props.page_size}
              onChange={this.handlePageSizeChange}>
              <option value="10">10 items</option>
              <option value="20">20 items</option>
              <option value="30">30 items</option>
              <option value="40">40 items</option>
              <option value="50">50 items</option>
            </FormControl>
          </FormGroup>
          </Form>
        </Pager>
        <br/>
        <div className={style.TourColumnContainer}>
          <div className={style.TourColumn}>
            <ToursList tours={colTours[0]} tourDisplayProps={{display:"large"}} />
          </div>
          <div className={style.TourColumn}>
            <ToursList tours={colTours[1]} tourDisplayProps={{display:"large"}} />
          </div>
          <div className={style.TourColumn}>
            <ToursList tours={colTours[2]} tourDisplayProps={{display:"large"}} />
          </div>
          <div className={style.TourColumn}>
            <ToursList tours={colTours[3]} tourDisplayProps={{display:"large"}} />
          </div>
        </div>
        <Pager>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            items={this.props.page_count}
            maxButtons={5}
            activePage={Number.parseInt(this.props.page,10)+1}
            onSelect={this.handlePageChange} />
        </Pager>
      </div>
    );
  }
  numColumns() {
      var w = window.innerWidth
      if (w < 600)
        return 1;
      if (w < 950)
        return 2;
      if (w < 1250)
        return 3;
      return 4;
  }
  getTourList(tours) {
      var nc = this.nc;
      var colTourSizes = [0,nc<2?Infinity:0,nc<3?Infinity:0,nc<4?Infinity:0];
      var colTours = [[], [], [], []];
      for (var tourId in tours) {
          var minCol = -1;
          var minVal = Infinity;
          for (var t in colTourSizes) {
              if (colTourSizes[t] < minVal) {
                  minVal = colTourSizes[t];
                  minCol = t;
              }
          }
          colTours[minCol].push(tours[tourId]);
          colTourSizes[minCol] += tours[tourId].profile_image_height/tours[tourId].profile_image_width;
      }
      return colTours;
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
    page: state.SearchReducer.page,
    page_size: state.SearchReducer.page_size,
    page_count: state.SearchReducer.page_count,
    isLoaded: state.SearchReducer.isLoaded
  };
}

export default connect(select)(SearchBar);
