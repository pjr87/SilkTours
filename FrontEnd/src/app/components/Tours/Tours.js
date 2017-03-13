import React from 'react';

import { Link } from 'react-router';

import Col from 'react-bootstrap/lib/Col';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import Button from 'react-bootstrap/lib/Button';
import Image from 'react-bootstrap/lib/Image';

class Tours extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      additional_accomadation: this.props.additional_accomadation,
      additional_food: this.props.additional_food,
      additional_transport: this.props.additional_transport,
      address_city: this.props.address_city,
      address_country: this.props.address_country,
      address_street: this.props.address_street,
      address_suffix: this.props.address_suffix,
      address_unit: this.props.address_unit,
      address_unit_number: this.props.address_unit_number,
      address_zip: this.props.address_zip,
      average_rating: this.props.average_rating,
      description: this.props.description,
      firstStart_date: this.props.firstStart_date,
      id_guide: this.props.id_guide,
      id_rating: this.props.id_rating,
      id_tour: this.props.id_tour,
      is_deleted: this.props.is_deleted,
      lastEnd_date: this.props.lastEnd_date,
      max_group_size: this.props.max_group_size,
      min_group_size: this.props.min_group_size,
      name: this.props.name,
      price: this.props.price,
      profile_image: this.props.profile_image,
      rating_count: this.props.rating_count,
      stops: this.props.stops,
    };
  }
  render(){
    return (
      <Col xs={12} md={6} lg={6}>
        <Thumbnail>
          <img width={900} height={400} alt="1800x800" src={this.state.profile_image}/>
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
            <Button bsStyle="default">Message</Button>
          </p>
        </Thumbnail>
      </Col>
    );
  }
};

export default Tours;
