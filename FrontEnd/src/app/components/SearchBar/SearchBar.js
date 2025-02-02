import React from 'react';
import Style from './style.css';

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
      advancedFilterShow: false,
      language: 'english',
      start_date_time: '',
      end_date_time: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handlePriceMinChange = this.handlePriceMinChange.bind(this);
    this.handlePriceMaxChange = this.handlePriceMaxChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleKeywordsChange = this.handleKeywordsChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleInterestsChange = this.handleInterestsChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.expandAdvancedFilter = this.expandAdvancedFilter.bind(this);
    this.compressAdvancedFilter = this.compressAdvancedFilter.bind(this);
    // this.nc = this.numColumns();
    // window.addEventListener("resize", this.handlePageSizeChange);
  }

  componentDidMount() {
    this.fetchPostInfo(this.state.rating, this.state.priceMin, this.state.priceMax, this.state.keywords, this.state.page, this.state.page_size, this.state.city, this.state.interests);
  }

  fetchPostInfo = async (rating, priceMin, priceMax, keywords, page, page_size, city, interests) => {
     try {
       var rating_prop = "";
       var priceMin_prop = "";
       var priceMax_prop = "";
       var keywords_prop = "";
       var city_prop = "";
       var interests_prop = "";
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
       if (city != "") {
         city_prop = "&city="+city;
       }
       if (interests != "") {
         interests_prop = "&interests="+interests;
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
       console.log('city: ' + city_prop);
       console.log('interests: ' + interests_prop);
       console.log('page: ' + page);
       console.log('page_size: ' + page_size);
      //  console.log('interests: ' + this.state.interests);
      //  console.log('city: ' + this.state.city);

       const info = await Promise.all([
         service.getFilteredTours(rating_prop, priceMin_prop, priceMax_prop, keywords_prop, page_prop, page_size_prop, city_prop, interests_prop),
       ]);
       const tours = info[0].data.data;
       if(this.props.loggedIn) {
         const infoFavorite = await Promise.all([
           service.favorite_details(this.props.id_user, this.props.auth)
         ]);
         const fav_tours = infoFavorite[0].data;
         for(var i=0; i<tours.length;i++){
           tours[i].favorite = false;
           for(var j=0; j<fav_tours.length;j++){
               if(tours[i].id_tour == fav_tours[j].id_tour) {
                 tours[i].favorite = true;
                 break;
               }
           }
         }
       }
       this.setState({
         tours,
         page_count: info[0].data.page_count,
       });

     } catch(e) {
       console.log(e);
     }
   }

  handleSubmit(e) {
    e.preventDefault();
    this.fetchPostInfo(this.state.rating, this.state.priceMin, this.state.priceMax, this.state.keywords, 0, 10, this.state.city, this.state.interests);
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
  handleCityChange(e) {
    this.setState({ city: e.target.value });
  }
  handleInterestsChange(e) {
    this.setState({ interests: e.target.value });
  }
  handlePageSizeChange(e) {
    // var _nc = this.numColumns()
    // if (_nc == this.nc) return;
    // this.nc = _nc;
    // this.forceUpdate();

    this.setState({ page_size: e.target.value, page: 0 });
    this.fetchPostInfo(this.state.rating, this.state.priceMin, this.state.priceMax, this.state.keywords, 0, e.target.value, this.state.city, this.state.interests);
    // this.props.dispatch(searchTour(this.state.rating, this.state.priceMin, this.state.priceMax, this.state.keywords, "", "", this.props.page, e.target.value));
  }
  handlePageChange(e) {
    // this.props.dispatch(setSelectedPage(e-1));
    this.setState({ page: e-1 });
    this.fetchPostInfo(this.state.rating, this.state.priceMin, this.state.priceMax, this.state.keywords, e-1, this.state.page_size, this.state.city, this.state.interests);
    window.scrollTo(0, 0)
    // this.props.dispatch(searchTour(this.state.rating, this.state.priceMin, this.state.priceMax, this.state.keywords, "", "", e-1, this.props.page_size));
  }
  expandAdvancedFilter() {
    this.setState({ advancedFilterShow: true });
  }

  compressAdvancedFilter() {
    this.setState({ advancedFilterShow: false });
  }
  render(){
    // var colTours = this.getTourList(this.state.tours);
    let showExpandedAdvancedFilter = null;
    if(this.state.advancedFilterShow) {
      showExpandedAdvancedFilter =
      <div>
        <Form inline>
          <FormGroup controlId="interests">
            <ControlLabel>Interests</ControlLabel>
            {'  '}
            <FormControl componentClass="select" placeholder="select" value={this.state.interests}
              onChange={this.handleInterestsChange}>
              <option value="">None</option>
              <option value="sports">Sports</option>
              <option value="food">Food</option>
              <option value="city">City</option>
              <option value="entertainment">Entertainment</option>
            </FormControl>
          </FormGroup>
          &nbsp;&nbsp;&nbsp;
          <FormGroup controlId="language">
            <ControlLabel>Language</ControlLabel>
            {'  '}
            <FormControl componentClass="select" placeholder="select" value={this.state.language}>
              <option value="">None</option>
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="hindi">Hindi</option>
              <option value="chiniese">Chniese</option>
              <option value="korean">Korean</option>
            </FormControl>
          </FormGroup>
          &nbsp;&nbsp;&nbsp;
          <FormGroup controlId="city">
            <ControlLabel>city</ControlLabel>
            {'  '}
            <FormControl value={this.state.city}
              onChange={this.handleCityChange}/>
          </FormGroup>
        </Form>
        <br/>
        <Form inline>
          <FormGroup controlId="start_date_time">
            <ControlLabel>Start Time</ControlLabel>
            {'  '}
            <FormControl componentClass="select" placeholder="select" value={this.state.start_date_time}>
              <option value=""></option>
              <option value="12:00 AM">12:00 AM</option>
              <option value="1:00 AM">1:00 AM</option>
              <option value="2:00 AM">2:00 AM</option>
              <option value="3:00 AM">3:00 AM</option>
              <option value="4:00 AM">4:00 AM</option>
              <option value="5:00 AM">5:00 AM</option>
              <option value="6:00 AM">6:00 AM</option>
              <option value="7:00 AM">7:00 AM</option>
              <option value="8:00 AM">8:00 AM</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="1:00 PM">1:00 PM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="4:00 PM">4:00 PM</option>
              <option value="5:00 PM">5:00 PM</option>
              <option value="6:00 PM">6:00 PM</option>
              <option value="7:00 PM">7:00 PM</option>
              <option value="8:00 PM">8:00 PM</option>
              <option value="9:00 PM">9:00 PM</option>
              <option value="10:00 PM">10:00 PM</option>
              <option value="11:00 PM">11:00 PM</option>
            </FormControl>
          </FormGroup>
          &nbsp;&nbsp;&nbsp;
          <FormGroup controlId="end_date_time">
            <ControlLabel>End Time</ControlLabel>
            {'  '}
            <FormControl componentClass="select" placeholder="select" value={this.state.end_date_time}>
              <option value=""></option>
              <option value="12:00 AM">12:00 AM</option>
              <option value="1:00 AM">1:00 AM</option>
              <option value="2:00 AM">2:00 AM</option>
              <option value="3:00 AM">3:00 AM</option>
              <option value="4:00 AM">4:00 AM</option>
              <option value="5:00 AM">5:00 AM</option>
              <option value="6:00 AM">6:00 AM</option>
              <option value="7:00 AM">7:00 AM</option>
              <option value="8:00 AM">8:00 AM</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="1:00 PM">1:00 PM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="4:00 PM">4:00 PM</option>
              <option value="5:00 PM">5:00 PM</option>
              <option value="6:00 PM">6:00 PM</option>
              <option value="7:00 PM">7:00 PM</option>
              <option value="8:00 PM">8:00 PM</option>
              <option value="9:00 PM">9:00 PM</option>
              <option value="10:00 PM">10:00 PM</option>
              <option value="11:00 PM">11:00 PM</option>
            </FormControl>
          </FormGroup>
        </Form>
        <br/>
        <div onClick={this.compressAdvancedFilter}>
          <p className={Style.advancedSearch}>Advanced Filter &#9651;</p>
        </div>
      </div>
    }
    else {
      showExpandedAdvancedFilter =
        <div onClick={this.expandAdvancedFilter}>
          <p className={Style.advancedSearch}>Advanced Filter &#9661;</p>
        </div>
    }
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
            {showExpandedAdvancedFilter}
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
            <ToursList tours={this.state.tours} fav_tours={this.state.fav_tours} tourDisplayProps={{display:"large", contactTouristBtn:true}} />
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
}

// select chooses which props to pull from store
function select(state) {
  return {
    auth: state.AuthReducer.auth,
    loggedIn: state.AuthReducer.loggedIn,
    id_user: state.AuthReducer.id_user,
  };
}

export default connect(select)(SearchBar);
