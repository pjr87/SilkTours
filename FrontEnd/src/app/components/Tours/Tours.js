import React from 'react';
import { Link } from 'react-router';
import style from './style.css';

import {Col, Thumbnail, Button, Image} from 'react-bootstrap';

import StarRatingComponent from 'react-star-rating-component';

import {connect} from 'react-redux';

class Tours extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      showTourInfo: false,
    };
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver = () => {
    this.setState({showTourInfo: true});
  }
  mouseOut() {
    this.setState({showTourInfo: false});
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

      const cancelBtn = (this.props.tourDisplayProps.cancelBtn) ? (<p>
          <Link
            to={{
              pathname: '/cancelTour',
              query: { tourId: this.state.id_tour }
            }}>
            <Button bsStyle="primary">Cancel Booking</Button>&nbsp;
          </Link>
        </p>) : null;


    if(this.props.tourDisplayProps.display == "small"){

      tourDisplay = (
        <div xs={12} md={6} lg={6}>
          <Thumbnail>
            <div onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)}>
              {this.state.showTourInfo ? (<img className={style.tour_image_small_info} src={this.props.tour.profile_image}/>) : (<img className={style.tour_image_small} src={this.props.tour.profile_image}/>)}
            </div>
            <span>
            <p>{this.props.tour.name}</p>
            <p>${this.props.tour.price}</p>
            <StarRatingComponent
              name="rate1"
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

            </p>{modifyBtn} {contactGuideBtn} {summaryBtn} {contactTouristBtn} {cancelBtn}</span>
          </Thumbnail>
        </div>);



    }
    else{

      tourDisplay = (
      <Col xs={12} md={4} lg={3}>
        <Thumbnail>
          <div onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)}>
            {this.state.showTourInfo ? (<Image className={style.tour_image_large_info} src={this.props.tour.profile_image}/>) : (<Image className={style.tour_image_large} src={this.props.tour.profile_image}/>)}
            {this.state.showTourInfo ? (<p className={style.image_text}>{this.props.tour.description}</p>): null}
          </div>
          <p>{this.props.tour.name}</p>
          <p>${this.props.tour.price}</p>
          <StarRatingComponent
            name="rate1"
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
            {/*guideButton*/}
          </p>
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
    selectedTour: state.TourDetailReducer.selectedTour
  };
}

export default connect(select)(Tours);
