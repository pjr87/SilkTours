import React from 'react'
import {Image, Col, Row, Grid, Button, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {connect} from 'react-redux';
import Style from "./style.css";
import dateFormat from 'dateformat';
import InfiniteCalendar, { Calendar, defaultMultipleDateInterpolation, withMultipleDates } from 'react-infinite-calendar';
import { selectDates, setSelectedDateStart, setSelectedDateEnd } from '../../actions/TourDetailActions';
import HostedField from 'hosted-fields-react';
import * as service from '../../utils/databaseFunctions';
import { browserHistory } from 'react-router';

class TourPayContents extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showCal: false,
      selectedDate: dateFormat(new Date(), "yyyy-mm-dd"),
      validationState: null,
      today: new Date(),
      paymentValidationError: false,
    };
    this.openModalCal = this.openModalCal.bind(this);
    this.closeModalCal = this.closeModalCal.bind(this);
    this.handleSelectedDateChange = this.handleSelectedDateChange.bind(this);
    this.handleSelectedTimeChange = this.handleSelectedTimeChange.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.hhmmss = this.hhmmss.bind(this);
    this.pad = this.pad.bind(this);
  }

  openModalCal() {
    this.setState({ showCal: true });
  }

  closeModalCal() {
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

  hhmmss(secs) {
    var minutes = Math.floor(secs / 60);
    secs = secs%60;
    var hours = Math.floor(minutes/60)
    minutes = minutes%60;
    return this.pad(hours)+":"+this.pad(minutes)+":"+this.pad(secs);
  }

  pad(str) {
      return ("0"+str).slice(-2);
  }

  render() {
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
      if(nonce != null) {
        console.log(`We turned some card details into jibberish: ${nonce}`);
        this.setState({paymentValidationError: false});

        var startTime = this.formatTime(this.props.selectedTourDateStart);
        var endTime = this.formatTime(this.props.selectedTourDateEnd);

        console.log("selectedTour", this.props.selectedTour);
        console.log("guide id", this.props.selectedTour.guides[0].id_user);

        var tourEvent = {
          id_tour: this.props.selectedTourId,
          id_user:	 this.props.id_user,
          id_guide: this.props.selectedTour.guides[0].id_user,
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

        console.log("test date time");
        console.log(this.props.selectedTourDateStart);
        console.log(this.props.selectedTourDateEnd);
        browserHistory.push('/tourconfirmation');
      }
      else {
        console.log('Invalid Card Number');
        this.setState({paymentValidationError: true});
      }
    };
    return(
      <div>
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <p className={Style.tourTitle}>{this.props.selectedTour.name}</p>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <form>
                <FormGroup>
                  <ControlLabel>Selected Date: (Click to change)</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.props.selectedTourDateString}
                    placeholder="Click to choose date"
                    onClick={this.openModalCal}
                    readOnly
                    />
                    <Modal show={this.state.showCal} onHide={this.closeModalCal} dialogClassName={Style.modalCal}>
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
              {this.state.paymentValidationError ? (<p className={Style.validationError}>Invalid card information. Please check your card information and try again.</p>) : null}

              <HostedField fetchToken={getToken} onTokenization={onTokenization} />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Image src={this.props.selectedTour.profile_image}/>
              <p className={Style.contentTitle}><b>About</b></p>
              <p className={Style.content}>{this.props.selectedTour.description}</p>
              <p className={Style.contentTitle}><b>Meeting Location</b></p>
              <p className={Style.content}>{this.props.selectedTour.address.city}</p>
              <p className={Style.contentTitle}>Transportation</p>
              <p className={Style.content}></p>
              <p className={Style.contentTitle}>What's Included</p>
              <li className={Style.content}>Accomodation: {this.props.selectedTour.additional_accomadation}</li>
              <li className={Style.content}>Food: {this.props.selectedTour.additional_food}</li>
              <li className={Style.content}>Transportation: {this.props.selectedTour.additional_transport}</li>
            </Col>
          </Row>
        </Grid>
        <br/>
      </div>
    );
  }
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
  };
}

export default connect(select)(TourPayContents);
