import React from 'react';
import { Link } from 'react-router';

import style from "./style.css";

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


class TourDetailContents extends React.Component{
  constructor(props) {
    super();
    this.state = {
      showModal: false,
      showModalCal: false,
      showCal: false,
      selectedDate: dateFormat(new Date(), "yyyy-mm-dd"),
      validationState: null,
      today: new Date(),
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  closeModal() {
    this.setState({ showModal: false, validationState: null });
  }

  openModal() {
    if(this.props.loggedIn) {
      this.setState({ showModal: true });
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
    let showExpandedCal = null;
    if(this.state.showCal) {
      showExpandedCal =
      <div>
      <Button onClick={this.compressCal}>Compress</Button>
        <p className={style.contentSubTitle}>Available Time: </p>
        {this.props.tourDates.map((avTime, i) => {
          return (
            <li key={i} className={style.content}>{avTime.start} ~ {avTime.end}</li>);
        })}
      <InfiniteCalendar
        width={400}
        height={400}
        selected={this.state.today}
        minDate={this.state.today}
        onSelect={this.handleSelectedDateChange}
        />
      </div>
    }

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

    const getToken = () => {
      // Replace this with an actual promise to your Braintree-enabled server
      return new Promise((resolve) => {
        // Example taken from https://developers.braintreepayments.com/start/hello-client/javascript/v2
        const exampleClientToken = "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI3OTJmMDBkOGJiZmQxZTIyNDc2NGQ3YzlmOGRmOGNkODEyMjUzMGYwZDUyYWRjOGI4NzZiMTc1NGNkMzRlZGFlfGNyZWF0ZWRfYXQ9MjAxNy0wMi0wMVQwMDoxMTo1OC4wMDA4NDQ4MjUrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzM0OHBrOWNnZjNiZ3l3MmIifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJjb2luYmFzZUVuYWJsZWQiOmZhbHNlLCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0=";
        resolve(exampleClientToken);
      });
    };

    // Charge the card using the returned nonce if you want :)
    const onTokenization = (nonce) => {
      if(nonce!=null){
        this.setState({
          validationState: null
        })
        console.log(`Charge the card: ${nonce}`);

        var startTime = this.formatTime(this.props.selectedTourDateStart);
        var endTime = this.formatTime(this.props.selectedTourDateEnd);

        var tourEvent = {
          id_tour: this.props.selectedTourId,
          id_user:	 this.props.id_user,
          start_date_time: this.props.selectedTourDateString + " " + startTime,
          end_date_time: this.props.selectedTourDateString + " " + endTime,
          state: 'B'
        }
        console.log("tourevent");
        console.log(tourEvent);
        console.log('tureventID ' + this.props.selectedTourDateString)
        service.setTourEvent(tourEvent, this.props.auth).then(function(response){
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

        // this.props.dispatch(setSelectedDateStart(this.props.selectedTourDateStart));
        // this.props.dispatch(setSelectedDateEnd(this.props.selectedTourDateEnd));
        console.log("test date time");
        console.log(this.props.selectedTourDateStart);
        console.log(this.props.selectedTourDateEnd);
        browserHistory.push('/tourconfirmation');
      }
      else {
        this.setState({
          validationState: "error"
        })
        console.log('Error; check your card information');
      }
    };
    if(this.props.isLoaded == false){
      return(
        <div>
          <p className={style.tourTitle}>"Tour is loading"</p>
        </div>
      )
    }
    else{

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
      reserveEditButton = <Button bsStyle="primary" onClick={this.openModal}>Reserve&nbsp;</Button>
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
    else{
    }
      return(
        <div>
          <div className={style.boxed}>
            <p className={style.tourTitle}>{this.props.selectedTour.name}</p>
            <div className={style.tourSubTitle}>
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
            </div>
          </div>
          <div className = {style.thumbnailContainer}>
            <Thumbnail>
              <div className={style.imageContainer}>
                <Image src={this.props.selectedTour.profile_image}/>
              </div>
              <Grid>
                <Row>
                  <Col sm={12} md={5} lg={5}>
                    <p className={style.contentTitle}>About: {this.props.selectedTour.name}</p>
                    <p className={style.content}>Description: {this.props.selectedTour.description}</p>
                    <p className={style.content}>Price: ${this.props.selectedTour.price}</p>
                    <p className={style.content}>Review: {this.props.selectedTour.average_rating} out of 5</p>
                    <p className={style.content}>Max Group Size: {this.props.selectedTour.max_group_size}</p>
                    <p className={style.content}>Min Group Size: {this.props.selectedTour.min_group_size}</p>

                    <p className={style.contentSubTitle}>Stops: </p>
                    {this.props.selectedTour.stops.map((stops, i) => {
                      return (
                        <li key={i} className={style.content}>{i+1}</li>);

                      })}


                    <p className={style.contentSubTitle}>Guides: </p>
                    {this.props.selectedTour.guides.map((guides, i) => {
                      return (
                        <li key={i} className={style.content}><Link
                                      to={{
                                        pathname: '/profile',
                                        query: { guideUserId: this.props.selectedTour.guides[0].id_user}
                                        }}>
                                        {guides.first_name} {guides.last_name}
                                      </Link></li>);

                      })}


                    <p className={style.contentSubTitle}>Available Date: </p>

                    <form>
                    <FormGroup>
                      <FormControl
                        type="text"
                        value={this.props.selectedTourDateString}
                        placeholder="Click to choose date"
                        onClick={this.openModalCal}
                        readOnly
                        />
                    </FormGroup>
                    </form>

                    <p className={style.contentSubTitle}>Available Time: </p>
                    {this.props.tourDates.map((avTime, i) => {
                      return (
                        <li key={i} className={style.content}>{avTime.start} ~ {avTime.end}</li>);
                      })}
                    <Modal show={this.state.showModalCal} onHide={this.closeModalCal} dialogClassName={style.modalCal}>
                    <InfiniteCalendar
                      width={400}
                      height={400}
                      selected={this.state.today}
                      minDate={this.state.today}
                      onSelect={this.handleSelectedDateChange}
                      />
                    <p className={style.contentSubTitle}>Available Time: </p>
                    {this.props.tourDates.map((avTime, i) => {
                      return (
                        <li key={i} className={style.content}>{avTime.start} ~ {avTime.end}</li>);
                    })}
                    <Button onClick={this.closeModalCal}>Close</Button>
                    </Modal>
                    <p className={style.contentSubTitle}>Additional:</p>
                    <li className={style.content}>Accomodation: {this.props.selectedTour.additional_accomadation}</li>
                    <li className={style.content}>Food: {this.props.selectedTour.additional_food}</li>
                    <li className={style.content}>Transport: {this.props.selectedTour.additional_transport}</li>
                  </Col>
                  <Col sm={12} md={7} lg={7}>
                    <br/>

                    <div className={style.mapContainer}>
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
              </Row>
            </Grid>
            <br/>
            <Grid>
              <Row>
                <Col sm={12} md={12} lg={12}>
                  {reserveEditButton}
                  {guideButton}
                </Col>
              </Row>
            </Grid>
          </Thumbnail>
          <Thumbnail>
            <Row>
              <Col sm={12} md={12} lg={12}>
                <Panel header="Reviews">
                <ListGroup fill>
                {this.props.selectedTour.ratings.map((reviews, i) => {
                  return (
                    <ListGroupItem key={i}>
                      <p className={style.reviewContentTitle}>{reviews.id_user} {reviews.date_time_created}:</p>
                      <p className={style.reviewContent}>{reviews.comments}</p>
                    </ListGroupItem>);
                })}
                </ListGroup>
                </Panel>
              </Col>
            </Row>
          </Thumbnail>

        </div>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Reserve {this.props.selectedTour.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
            <FormGroup>
              <ControlLabel>Selected Date: (Click to change)</ControlLabel>
              <FormControl
                type="text"
                value={this.props.selectedTourDateString}
                placeholder="Click to choose date"
                onClick={this.expandCal}
                readOnly
                />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Select Time</ControlLabel>
              <FormControl componentClass="select" placeholder="select" onChange={this.handleSelectedTimeChange}>
                {this.props.tourDates.map((avTime, i) => {
                  return (
                    <option key={i} value={avTime.start+','+avTime.end}>{avTime.start} ~ {avTime.end}</option>);
                })}
              </FormControl>
            </FormGroup>
            </form>
            {showExpandedCal}
            <hr />
            <FormGroup controlId="cardValidationError" validationState={this.state.validationState}>
              <ControlLabel>Please check your card information</ControlLabel>
            </FormGroup>
            <div>
              <HostedField fetchToken={getToken} onTokenization={onTokenization} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
     }
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
