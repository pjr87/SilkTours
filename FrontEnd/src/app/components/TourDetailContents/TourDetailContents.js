import React from 'react';
import { Link } from 'react-router';
import Style from "./style.css";
import {Image, Col, Row, Grid, Thumbnail, Button, Modal, Form, FormControl, FormGroup, ControlLabel, Panel, ListGroupItem, ListGroup} from 'react-bootstrap';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import HostedField from 'hosted-fields-react';
import * as service from '../../utils/databaseFunctions';
import StarRatingComponent from 'react-star-rating-component';
import { setSelectedTour, setSelectedDateId, setSelectedDateStart, setSelectedDateEnd, selectDates } from '../../actions/TourDetailActions';
import InfiniteCalendar, { Calendar, defaultMultipleDateInterpolation, withMultipleDates } from 'react-infinite-calendar';
import dateFormat from 'dateformat';

var PacmanLoader = require('halogen/PacmanLoader');


class TourDetailContents extends React.Component{
  constructor(props) {
    super();
    this.state = {
      showModalCal: false,
      showCal: false,
      selectedDate: dateFormat(new Date(), "yyyy-mm-dd"),
      validationState: null,
      today: new Date(),
    };
    this.linkTourPage= this.linkTourPage.bind(this);
    this.openModalCal = this.openModalCal.bind(this);
    this.closeModalCal = this.closeModalCal.bind(this);
    this.hhmmss = this.hhmmss.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.pad = this.pad.bind(this);
    this.expandCal = this.expandCal.bind(this);
    this.compressCal = this.compressCal.bind(this);
    this.handleSelectedDateChange = this.handleSelectedDateChange.bind(this);
    this.handleSelectedTimeChange = this.handleSelectedTimeChange.bind(this);
  }

  pad(str) {
      return ("0"+str).slice(-2);
  }

  hhmmss(secs) {
    var minutes = Math.floor(secs / 60);
    secs = secs%60;
    var hours = Math.floor(minutes/60)
    minutes = minutes%60;
    return this.pad(hours)+":"+this.pad(minutes)+":"+this.pad(secs);
  }

  formatTime(time){
    var a = time.split(':');
    var b = a[1].split(' '); // split it at the colons
    console.log("b", b);
    var hours = Number(a[0])
    var minutes = Number(b[0])
    console.log("hours", hours);
    console.log("minutes", minutes);
    if(b[1] == "PM"){
      hours = hours+12;
    }
    console.log("hours", hours);
    console.log("minutes", minutes);

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var seconds = (+hours) * 60 * 60 + (+minutes) * 60;

    console.log(seconds);
    var newtime = this.hhmmss(seconds);
    console.log("newtime", newtime);
    return newtime;
  }

  linkTourPage() {
    if(this.props.loggedIn) {
      browserHistory.push('/tourpaypage');
    }
    else {
      browserHistory.push('/signredirect');
    }
  }

  closeModalCal() {
    this.setState({ showModalCal: false });
  }

  openModalCal() {
    this.setState({ showModalCal: true });
  }

  expandCal() {
    this.setState({ showCal: true });
  }

  compressCal() {
    this.setState({ showCal: false });
  }

  handleSelectedDateChange(date) {
    // this.props.dispatch(setSelectedDateId(e.target.value))
    var year = date.getFullYear();
    var month = (date.getMonth()+1);
    var date = date.getDate();
    var yearMonthDate = (year + '-' + month + '-' + date)
    this.setState({ selectedDate: yearMonthDate})
    this.props.dispatch(selectDates(this.props.selectedTourId, yearMonthDate));
  }

  handleSelectedTimeChange (e) {
    var ar = e.target.value.split(',');
    this.props.dispatch(setSelectedDateStart(ar[0]));
    this.props.dispatch(setSelectedDateEnd(ar[1]));
  }

  render(){
    // try change me to a custom color like "red" or "#000000"
    var color = '#BB66AA';

    console.log("Tour:", this.props.selectedTour);
    console.log(this.props.tourDates);

    console.log("test: ", JSON.stringify(this.props.selectedTour) == '{}' )

    if( !this.props.selectedTour || !this.props.tourDates || JSON.stringify(this.props.selectedTour) == '{}'  ){
      console.log("render1");
      console.log(this.props.selectedTour);
      console.log(this.props.tourDates);
      return <div>
        <br/>
        <br/>
          <Grid>
            <Col sm={6} xsOffset={5}>
              <PacmanLoader style={Style.spinner} color={color}/>
            </Col>
          </Grid>
      </div>
    }

    console.log("render2");
    console.log(this.props.selectedTour);
    console.log(this.props.tourDates);


    console.log("stops: ", this.props.tourDates);
    const guidesLength = this.props.selectedTour.guides.length;
    let guideButton = null;
    let isGuide = false;

    if (guidesLength > 0) {
      isGuide = (this.props.selectedTour.guides[0].id_user == this.props.user.id_users) ? true : false;
      if(this.props.loggedIn) {

        if(isGuide){
          guideButton = null;
        }
        else
        {
          guideButton = <Link
                      to={{
                        pathname: '/messages',
                        query: { guideUserId: this.props.selectedTour.guides[0].id_user }
                        }}>
                        <Button bsStyle="default">Message</Button>
                      </Link>;
        }
      }
      else {
        guideButton = <Link
                      to={{
                        pathname: '/sign'
                        }}>
                        <Button bsStyle="default">Message</Button>
                      </Link>;
      }

    } else {
     guideButton = null;
    }
    let reserveEditButton = null;

    console.log("isGuide: ", isGuide);
    console.log("stuff", this.props.selectedTour.guides[0], this.props.user);

    if( isGuide ){
      reserveEditButton = <Link
                to={{
                  pathname: '/edittour',
                  query: { tourId: this.props.selectedTourId }
                }}> <Button bsStyle="primary">Edit Tour</Button>&nbsp; </Link>
    }
    else{
      reserveEditButton = <Button bsStyle="primary" onClick={this.linkTourPage}>Reserve&nbsp;</Button>
    }
    console.log("isGuide: ", isGuide);

    console.log("stuff", this.props.selectedTour.guides[0], this.props.user);

    if( isGuide ){
      reserveEditButton = <Link
                to={{
                  pathname: '/edittour',
                  query: { tourId: this.props.selectedTourId }
                }}> <Button bsStyle="primary">Edit Tour</Button>&nbsp; </Link>
    }
      return(
        <div className = {Style.tourDetailContainer}>
          <Grid>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Image src={this.props.selectedTour.profile_image}/>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <p className={Style.tourTitle}>{this.props.selectedTour.name}</p>
                <p className={Style.tourSubTitle}>{this.props.selectedTour.description}</p>
                <hr/>
                <div className={Style.tourSubTitle}>
                  <StarRatingComponent
                    name="rate1"
                    editing={false}
                    starColor="#ffb400"
                    emptyStarColor="#ffb400"
                    starCount={5}
                    value={this.props.selectedTour.average_rating}
                    renderStarIcon={(index, value) => {
                      return <span className={index <= value ? 'fa fa-star' : 'fa fa-star-o'} />;
                    }}
                    renderStarIconHalf={() => <span className="fa fa-star-half-full" />}
                  /> {this.props.selectedTour.rating_count} reviews
                  <p className={Style.content}><b>${this.props.selectedTour.price}</b></p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6}>
                <div className={Style.mapContainer}>
                <Gmaps
                  width={'94%'}
                  height={'400px'}
                  lat={typeof this.props.selectedTour.stops[0] == 'undefined' ? 39.9526 : this.props.selectedTour.stops[0].lat}
                  lng={typeof this.props.selectedTour.stops[0] == 'undefined' ? -75.1652 : this.props.selectedTour.stops[0].lon}
                  zoom={12}
                  loadingMessage={'Be happy'}
                  params={{v: '3.exp', key: 'AIzaSyA7hW-zSFPnfDssD8pXPbfS6ePP3j0xq98'}}
                  onMapCreated={this.onMapCreated}>
                  {this.props.selectedTour.stops.map((stops, i) => {
                    return (
                      <Marker
                        lat={stops.lat}
                        lng={stops.lon}
                        draggable={true}
                        onDragEnd={this.onDragEnd}
                        key={i}/>
                    );
                  })}
                  {this.props.selectedTour.stops.map((stops, i) => {
                    return (
                      <InfoWindow
                        lat={stops.lat}
                        lng={stops.lon}
                        content={'Stop: '+ (i+1)}
                        onCloseClick={this.onCloseClick}
                        key={i}/>
                      );
                  })}
                </Gmaps>
              </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <p className={Style.contentTitle}><b>About</b></p>
                <p className={Style.content}>{this.props.selectedTour.description}</p>
                <p className={Style.contentTitle}><b>Meeting Location</b></p>
                  {this.props.selectedTour.guides.map((guides, i) => {
                    return (
                      <li key={i} className={Style.content}><Link
                                    to={{
                                      pathname: '/profile',
                                      query: { guideUserId: this.props.selectedTour.guides[0].id_user}
                                      }}>
                                      {guides.first_name} {guides.last_name}
                                    </Link></li>);

                    })}
                <p className={Style.content}>{this.props.selectedTour.address.city}</p>
                <p className={Style.contentTitle}>Transportation</p>
                <p className={Style.content}></p>
                <p className={Style.contentTitle}>What's Included</p>
                <li className={Style.content}>Accomodation: {this.props.selectedTour.additional_accomadation}</li>
                <li className={Style.content}>Food: {this.props.selectedTour.additional_food}</li>
                <li className={Style.content}>Transportation: {this.props.selectedTour.additional_transport}</li>
                <br/>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12} lg={12}>
                <div className={Style.buttonContainer}>
                  <Button onClick={this.openModalCal}>Check Available Date</Button>
                    <Modal show={this.state.showModalCal} onHide={this.closeModalCal} dialogClassName={Style.modalCal}>
                    <InfiniteCalendar
                      width={400}
                      height={400}
                      selected={this.state.today}
                      minDate={this.state.today}
                      onSelect={this.handleSelectedDateChange}
                      />
                    <p className={Style.contentSubTitle}>Available Time: </p>
                    {this.props.tourDates.map((avTime, i) => {
                      return (
                        <li key={i} className={Style.content}>{avTime.start} ~ {avTime.end}</li>);
                    })}
                    <Button onClick={this.closeModalCal}>Close</Button>
                    </Modal>
                  {reserveEditButton}
                  {guideButton}
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12} lg={12}>
                <div className={Style.reviewContainer}>
                <Panel header="Reviews">
                <ListGroup fill>
                {this.props.selectedTour.ratings.length > 0 ? this.props.selectedTour.ratings.map((reviews, i) => {
                  return (
                    <ListGroupItem key={i}>
                      <p className={Style.reviewContentTitle}>{reviews.id_user} {reviews.date_time_created}:</p>
                      <p className={Style.reviewContent}>{reviews.comments}</p>
                    </ListGroupItem>);
                }) : <div style={{padding: 15}} >No Reviews Available</div>}
                </ListGroup>
                </Panel>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      );
  }
}

TourDetailContents.propTypes = {
  auth: React.PropTypes.object,
  selectedTourId: React.PropTypes.string,
  selectedTour: React.PropTypes.object,
  selectedTourDateString: React.PropTypes.string,
  isLoaded: React.PropTypes.bool
}

function select (state) {
  return {
    auth: state.AuthReducer.auth,
    id_user: state.AuthReducer.id_user,
    user: state.AuthReducer.user,
    loggedIn: state.AuthReducer.loggedIn,
    tourDates: state.TourDetailReducer.tourDates,
    selectedTourId: state.TourDetailReducer.selectedTourId,
    selectedTour: state.TourDetailReducer.selectedTour,
    selectedTourDateString: state.TourDetailReducer.selectedTourDateString,
    selectedTourDateStart: state.TourDetailReducer.selectedTourDateStart,
    selectedTourDateEnd: state.TourDetailReducer.selectedTourDateEnd,
    isLoaded: state.TourDetailReducer.isLoaded
  };
}

export default connect(select)(TourDetailContents);
