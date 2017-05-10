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
import * as service from '../../utils/databaseFunctions';

class SearchBar extends React.Component{
  constructor(props){
    super();
    this.state = {
      rating: '0',
      priceMin: '0',
      priceMax: '1000000',
      keywords: '',
      page_size: 10,
      page: 0,
      page_count: 10,
      tours: [],
      interests: '',
      city: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handlePriceMinChange = this.handlePriceMinChange.bind(this);
    this.handlePriceMaxChange = this.handlePriceMaxChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleKeywordsChange = this.handleKeywordsChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    // this.nc = this.numColumns();
    // window.addEventListener("resize", this.handlePageSizeChange);
  }

  componentDidMount() {
    this.fetchPostInfo(this.state.rating, this.state.priceMin, this.state.priceMax, this.state.keywords, this.state.page, this.state.page_size);
  }

  fetchPostInfo = async (rating, priceMin, priceMax, keywords, page, page_size) => {
     try {
       var rating_prop = "";
       var priceMin_prop = "";
       var priceMax_prop = "";
       var keywords_prop = "";
       var page_prop = "";
       var page_size_prop = "";

       if (rating != "0") {
         rating_prop = "&rating="+rating;
       }
       if (priceMin != "0") {
         priceMin_prop = "&priceMin="+priceMin;
       }
       if (priceMax != "1000000") {
         priceMax_prop = "&priceMax="+priceMax;
       }
       if (keywords != "") {
         keywords_prop = "&keywords="+keywords;
       }
       if (page != "") {
         page_prop = "&page="+page;
       }
       if (page_size != "") {
         page_size_prop = "&page_size="+page_size
       }

       console.log('rating: ' + rating_prop);
       console.log('priceMin: ' + priceMin_prop);
       console.log('priceMax: ' + priceMax_prop);
       console.log('keywords: ' + keywords_prop);
       console.log('page: ' + page);
       console.log('page_size: ' + page_size);
      //  console.log('interests: ' + this.state.interests);
      //  console.log('city: ' + this.state.city);

       const info = await Promise.all([
         service.getFilteredTours(rating_prop, priceMin_prop, priceMax_prop, keywords_prop, page_prop, page_size_prop)
       ]);

       // Object destructuring Syntax,
       // takes out required values and create references to them
       const tours = info[0].data.data;
       console.log(info[0].data.data);
      //  const page_size = info[0].data.page_size;
       console.log(info[0].data.page_count);
       this.setState({
         tours,
         page_count: info[0].data.page_count,
       });

     } catch(e) {
       console.log("error occured pulling tour data");
     }
   }

  handleSubmit(e) {
    e.preventDefault();
    this.fetchPostInfo(this.state.rating, this.state.priceMin, this.state.priceMax, this.state.keywords, 0, 10);
    // this.props.dispatch(setSelectedRating(this.state.rating))
    // this.props.dispatch(setSelectedPriceMin(this.state.priceMin))
    // this.props.dispatch(setSelectedPriceMax(this.state.priceMax))
    // this.props.dispatch(setSelectedKeywords(this.state.keywords))
    // this.props.dispatch(searchTour(this.state.rating, this.state.priceMin, this.state.priceMax, this.state.keywords, "", "", "", ""));
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
    // var _nc = this.numColumns()
    // if (_nc == this.nc) return;
    // this.nc = _nc;
    // this.forceUpdate();

    this.setState({ page_size: e.target.value });
    // this.props.dispatch(searchTour(this.state.rating, this.state.priceMin, this.state.priceMax, this.state.keywords, "", "", this.props.page, e.target.value));
  }
  handlePageChange(e) {
    // this.props.dispatch(setSelectedPage(e-1));
    this.setState({ page: e-1 });
    this.fetchPostInfo(this.state.rating, this.state.priceMin, this.state.priceMax, this.state.keywords, e-1, this.state.page_size);
    // this.props.dispatch(searchTour(this.state.rating, this.state.priceMin, this.state.priceMax, this.state.keywords, "", "", e-1, this.props.page_size));
  }
  render(){
    // var colTours = this.getTourList(this.state.tours);
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
            <FormControl componentClass="select" placeholder="select" value={this.state.page_size}
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
        {/*
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
        */}
        <Grid>
          <Row>
            <ToursList tours={this.state.tours} tourDisplayProps={{display:"large"}} />
          </Row>
        </Grid>

        <Pager>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            items={this.state.page_count}
            maxButtons={5}
            activePage={Number.parseInt(this.state.page,10)+1}
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

export default SearchBar;
