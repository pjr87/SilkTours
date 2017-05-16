import React from 'react';
import { Link } from 'react-router';
import Style from './style.css';
import {Confirm} from 'components';

import {Col, Thumbnail, Button, Image} from 'react-bootstrap';

import StarRatingComponent from 'react-star-rating-component';

import {connect} from 'react-redux';

import * as service from '../../utils/databaseFunctions';

class Tours extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      showTourTitle: false,
      showRatingCount: false,
    };
    this.mouseOverImage = this.mouseOverImage.bind(this);
    this.mouseOutImage = this.mouseOutImage.bind(this);
    this.mouseOverRating = this.mouseOverRating.bind(this);
    this.mouseOutRating = this.mouseOutRating.bind(this);
    this.handleAddFavorite = this.handleAddFavorite.bind(this);
  }

  mouseOverImage = () => {
    this.setState({showTourTitle: true});
  }
  mouseOutImage() {
    this.setState({showTourTitle: false});
  }
  mouseOverRating = () => {
    console.log("Test");
    this.setState({showRatingCount: true});
  }
  mouseOutRating() {
    this.setState({showRatingCount: false});
  }
  handleAddFavorite() {
    var userTourJson = {
      user_id: this.props.id_user,
      tour_id: this.props.tour.id_tour,
    }
    console.log("Favorite");
    console.log(userTourJson);
    try {
      service.favorite_tour(userTourJson, this.props.auth).then(function(response){
        if(response.data) {
          console.log(response.data);
        }
        else{
          // If there was a problem, show an error
          console.log('response.error: ' + response.error);
        }
      });
    } catch(e) {
      console.log("error occured submitting data" + e);
    }
  }
  render(){
    //const guidesLength = this.state.guides.length;
    let tourDisplay = null;

    const modifyBtn = (this.props.tourDisplayProps.modifyBtn) ? (<p>
        <Link
          to={{
            pathname: '/tourModify',
            query: { tourId: this.state.id_tour }
          }}>
          <Button bsStyle="primary">Modify</Button>&nbsp;
        </Link>
      </p>) : null;

    const contactGuideBtn = (this.props.tourDisplayProps.contactGuideBtn) ? (<p>
        <Link
          to={{
            pathname: '/messages',
            query: { tourId: this.state.id_tour }
          }}>
          <Button bsStyle="primary">Message Guide</Button>&nbsp;
        </Link>
      </p>) : null;

      const summaryBtn = (this.props.tourDisplayProps.summaryBtn) ? (<p>
          <Link
            to={{
              pathname: '/messages',
              query: { tourId: this.state.id_tour }
            }}>
            <Button bsStyle="primary">Review Summary</Button>&nbsp;
          </Link>
        </p>) : null;

      const contactTouristBtn = (this.props.tourDisplayProps.contactTouristBtn) ? (<p>
          <Link
            to={{
              pathname: '/messages',
              query: { tourId: this.state.id_tour }
            }}>
            <Button bsStyle="primary">Message Tourist</Button>&nbsp;
          </Link>
        </p>) : null;

    let containsParticipants = false;
    if( this.props.tour.participants != null )
    {
      if( this.props.tour.participants.length > 0 )
      {
        containsParticipants = true;
      }
    }

      const cancelTourBody =  <div>
                                Are you sure you want to delete the following scheduled tour?
                                <div className={Style.confirmBody}>
                                  <p><span className={Style.confirmBodySideHeader}>Name:</span> {this.props.tour.name}</p>
                                  <p><span className={Style.confirmBodySideHeader}>Start Time:</span> {this.props.tour.start_date_time}</p>
                                  <p><span className={Style.confirmBodySideHeader}>End Time:</span> {this.props.tour.end_date_time}</p>

                                  { this.props.tourDisplayProps.isGuide && containsParticipants &&
                                  <p>
                                    <span className={Style.confirmBodySideHeader}>Tourist:</span>
                                      {this.props.tour.participants[0].first_name + " " + this.props.tour.participants[0].last_name}
                                  </p>
                                  }

                                  { !this.props.tourDisplayProps.isGuide && this.props.tour.guides != null && this.props.tour.guides.length > 0 &&
                                  <p>
                                    <span className={Style.confirmBodySideHeader}>Guide:</span>
                                      {this.props.tour.guides[0].first_name + " " + this.props.tour.guides[0].last_name}
                                  </p>
                                  }

                                </div>
                              </div>;
      console.log();
      const cancelBtn = (this.props.tour.state != "D" && this.props.tourDisplayProps.cancelBtn) ? (
          <Confirm
          onConfirm={()=>this.props.cancelTourEvent(this.props.tour.id_tourEvent, this.props.tourDisplayProps.isGuide)}
          body={cancelTourBody}
          confirmText="Cancel Tour"
          title="Tour Cancellation">
          <Button className={Style.buttonWidth} bsStyle="primary">Cancel</Button>
          </Confirm>
              ) : null;


      console.log("Tour: ", this.props.tour);

      let contactButton = null;
      if(this.props.tourDisplayProps.messageButton != false)
      {
        if(!this.props.loggedIn)
        {
          contactButton = <Link
                        to={{
                          pathname: '/sign'
                          }}>
                          <Button className={Style.buttonWidth} bsStyle="default">Message</Button>
                        </Link>;
        }else if( this.props.tourDisplayProps.isGuide && this.props.tour.participants != null && this.props.tour.participants.length > 0 )
        {
          contactButton = <Link
                        to={{
                          pathname: '/messages',
                          query: { guideUserId: this.props.tour.participants[0].id_users }
                          }}>
                          <Button className={Style.buttonWidth} bsStyle="primary">Message</Button>
                        </Link>;
        }else if( !this.props.tourDisplayProps.isGuide && this.props.tour.guides != null && this.props.tour.guides.length > 0)
        {
          contactButton = <Link
                        to={{
                          pathname: '/messages',
                          query: { guideUserId: this.props.tour.guides[0].id_user }
                          }}>
                          <Button className={Style.buttonWidth} bsStyle="primary">Message</Button>
                        </Link>;
        }else
        {
          contactButton = null;
        }
      }



    let guideButton = null;
    if (this.props.tour.guides != null && this.props.tour.guides.length > 0) {
      if(this.props.loggedIn) {
        guideButton = <Link
                      to={{
                        pathname: '/messages',
                        query: { guideUserId: this.props.tour.guides[0].id_user }
                        }}>
                        <Button className={Style.buttonWidth} bsStyle="primary">Message</Button>
                      </Link>;
      }
      else {
        guideButton = <Link
                      to={{
                        pathname: '/sign'
                        }}>
                        <Button className={Style.buttonWidth} bsStyle="primary">Message</Button>
                      </Link>;
      }
    } else {
      guideButton = null;
    }

    let editTourBtn = null;

    if( this.props.tourDisplayProps.editBtn == true ){
      editTourBtn = <Link
                to={{
                  pathname: '/edittour',
                  query: { tourId: this.props.tour.id_tour }
                }}> <Button bsStyle="primary">Edit Tour</Button>&nbsp; </Link>
    }




    if(this.props.tourDisplayProps.display == "small"){





      tourDisplay = (
        <Col xs={12} md={6} lg={6}>
          <Thumbnail src={this.props.tour.profile_image}>
            <div>
            <p>{this.props.tour.name}  {this.props.tour.id_tourEvent}</p>
            { this.props.tourDisplayProps.isGuide && this.props.tour.participants != null && this.props.tour.participants.length > 0 &&
              <p>
                <span className={Style.confirmBodySideHeader}>Tourist: </span>
                  {this.props.tour.participants[0].first_name + " " + this.props.tour.participants[0].last_name}
              </p>
            }

            { !this.props.tourDisplayProps.isGuide && this.props.tour.guides != null && this.props.tour.guides.length > 0 &&
              <p>
                <span className={Style.confirmBodySideHeader}>Guide:</span>
                  {this.props.tour.guides[0].first_name + " " + this.props.tour.guides[0].last_name}
              </p>
            }
            <div className={Style.buttonContainer}>
              <Link
                to={{
                  pathname: '/tourdetail',
                  query: { tourId: this.props.tour.id_tour }
                }}>
                <Button bsStyle="primary" className={Style.buttonWidth}>More Info</Button>&nbsp;
              </Link>

            {modifyBtn} {contactButton} {summaryBtn} {contactTouristBtn} {cancelBtn} {editTourBtn} </div>
            </div>
          </Thumbnail>
          </Col>);



    }
    else {

      tourDisplay = (
      <Col xs={6} md={4} lg={3}>
        <Thumbnail bsStyle="thumbnail">

          <div onMouseOver={this.mouseOverImage.bind(this)} onMouseOut={this.mouseOutImage.bind(this)}>
            {this.state.showTourTitle ? (<Image className={Style.tour_image_large_info} src={this.props.tour.profile_image}/>) : (<Image className={Style.tour_image_large} src={this.props.tour.profile_image}/>)}
            {this.state.showTourTitle ? (<p className={Style.image_text}>{this.props.tour.name}</p>): null}
          </div>
          <div onClick={this.handleAddFavorite}>
            <p className={Style.image_heart}>&#9825;</p>
          </div>
          {/*
          <p>{this.props.tour.name}</p>
          <p>${this.props.tour.price}</p>
          <StarRatingComponent
            name="rate1"
            editing={false}
            starColor="#ffb400"
            emptyStarColor="#ffb400"
            starCount={5}
            value={this.props.tour.average_rating}
            renderStarIcon={(index, value) => {
              return <span className={index <= value ? 'fa fa-star' : 'fa fa-star-o'} />;
            }}
            renderStarIconHalf={() => <span className="fa fa-star-half-full" />}
          />
          {this.props.tour.rating_count} reviews
          <p>
            <Link
              to={{
                pathname: '/tourdetail',
                query: { tourId: this.props.tour.id_tour }
              }}>
              <Button bsStyle="primary">More Info</Button>&nbsp;
            </Link>
            <Button bsStyle="success" onClick={this.handleAddFavorite}>Add to Favorite</Button>&nbsp;
          </p>
          {guideButton}
          */}

          <p>{this.props.tour.description}</p>

          <hr/>
          <p className={Style.tour_description}>${this.props.tour.price}</p>
          <div className={Style.tour_description_star_container} onMouseOver={this.mouseOverRating.bind(this)} onMouseOut={this.mouseOutRating.bind(this)}>
            {this.state.showRatingCount ? null :
              (<StarRatingComponent
                className = {Style.tour_description_star}
                name="rate1"
                editing={false}
                starColor="#ffb400"
                emptyStarColor="#ffb400"
                starCount={5}
                value={this.props.tour.average_rating}
                renderStarIcon={(index, value) => {
                  return <span className={index <= value ? 'fa fa-star' : 'fa fa-star-o'} />;
                }}
                renderStarIconHalf={() => <span className="fa fa-star-half-full" />}
              />)}
            {this.state.showRatingCount ? (<p>{this.props.tour.rating_count} reviews</p>) : null}

          </div>
        </Thumbnail>
      </Col>);
    }


    /*let guideButton = null;
    if (guidesLength != '0') {
      if(this.props.loggedIn) {
        guideButton = <Link
                      to={{
                        pathname: '/messages',
                        query: { guideUserId: this.state.guides[0].id_user }
                        }}>
                        <Button bsStyle="default">Message</Button>
                      </Link>;
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
    }*/
    return (<div>
      {tourDisplay}
    </div>);
  }
}

function select (state) {
  return {
    loggedIn: state.AuthReducer.loggedIn,
    auth: state.AuthReducer.auth,
    selectedTour: state.TourDetailReducer.selectedTour,
    id_user: state.AuthReducer.id_user,
  };
}

export default connect(select)(Tours);
