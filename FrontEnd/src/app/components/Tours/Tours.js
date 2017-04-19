import React from 'react';
import { Link } from 'react-router';
import style from './style.css';
import Col from 'react-bootstrap/lib/Col';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import Button from 'react-bootstrap/lib/Button';
import Image from 'react-bootstrap/lib/Image';

import {connect} from 'react-redux';

class Tours extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      additional_accomadation: this.props.tour.additional_accomadation,
      additional_food: this.props.tour.additional_food,
      additional_transport: this.props.tour.additional_transport,
      address_city: this.props.tour.address_city,
      address_country: this.props.tour.address_country,
      address_street: this.props.tour.address_street,
      address_suffix: this.props.tour.address_suffix,
      address_unit: this.props.tour.address_unit,
      address_unit_number: this.props.tour.address_unit_number,
      address_zip: this.props.tour.address_zip,
      average_rating: this.props.tour.average_rating,
      description: this.props.tour.description,
      firstStart_date: this.props.tour.firstStart_date,
      guides: this.props.tour.guides,
      id_rating: this.props.tour.id_rating,
      id_tour: this.props.tour.id_tour,
      is_deleted: this.props.tour.is_deleted,
      lastEnd_date: this.props.tour.lastEnd_date,
      max_group_size: this.props.tour.max_group_size,
      min_group_size: this.props.tour.min_group_size,
      name: this.props.tour.name,
      price: this.props.tour.price,
      profile_image: this.props.tour.profile_image,
      rating_count: this.props.tour.rating_count,
      stops: this.props.tour.stops,
    };
  }

  render(){
    //const guidesLength = this.state.guides.length;
    let tourDisplay = null;
    console.log("display", this.props.tourDisplayProps);
    if(this.props.tourDisplayProps.display == "small"){
      console.log("MEOW!");
      tourDisplay = (
        <Col xs={12} md={6} lg={6}>
          <Thumbnail>
            <img className={style.tour_image_small} src={this.state.profile_image}/><span>
            <p>{this.state.name}</p>
            <p>review: </p>
            <p>price: ${this.state.price}</p>
            <p>
              <Link
                to={{
                  pathname: '/tourdetail',
                  query: { tourId: this.state.id_tour }
                }}>
                <Button bsStyle="primary">More Info</Button>&nbsp;
              </Link>
              {/*guideButton*/}
            </p></span>
          </Thumbnail>
        </Col>);
    }
    else{
      console.log("WOOF");
      tourDisplay = (
      <Col xs={12} md={6} lg={6}>
        <Thumbnail>
          <img className="card-img-top tour-image-large img-responsive"  src={this.state.profile_image}/>
          <p>{this.state.name}</p>
          <p>review: </p>
          <p>price: ${this.state.price}</p>
          <p>
            <Link
              to={{
                pathname: '/tourdetail',
                query: { tourId: this.state.id_tour }
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
    </div>
    );
  }
};

function select (state) {
  return {
    loggedIn: state.AuthReducer.loggedIn,
    selectedTour: state.TourDetailReducer.selectedTour,
  };
}

export default connect(select)(Tours);
