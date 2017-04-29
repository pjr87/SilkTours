import React from 'react';
import {Tours} from 'components';

//import {connect} from 'react-redux';

// const ToursList = ({tours}) => {
//   // map data to components
//   const toursList = tours.map(
//     (tours, index)=>(
//       <Tours
//         additional_accomadation={tours.additional_accomadation}
//         additional_food={tours.additional_food}
//         additional_transport={tours.additional_transport}
//         address_city={tours.address_city}
//         address_country={tours.address_country}
//         address_street={tours.address_street}
//         address_suffix={tours.address_suffix}
//         address_unit={tours.address_unit}
//         address_unit_number={tours.address_unit_number}
//         address_zip={tours.address_zip}
//         average_rating={tours.average_rating}
//         description={tours.description}
//         firstStart_date={tours.firstStart_date}
//         guides={tours.guides}
//         id_rating={tours.id_rating}
//         id_tour={tours.id_tour}
//         is_deleted={tours.is_deleted}
//         lastEnd_date={tours.lastEnd_date}
//         max_group_size={tours.max_group_size}
//         min_group_size={tours.min_group_size}
//         name={tours.name}
//         price={tours.price}
//         profile_image={tours.profile_image}
//         rating_count={tours.rating_count}
//         stops={tours.stops}
//         key={index}
//       />
//     )
//   );
//   return (
//     <div>
//       {toursList}
//     </div>
//   );
// };
//


class ToursList extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){

    console.log("propsToursList", this.props);

    const tours = this.props.tours.map(function(tour,index) {
      console.log("tpropsinlist:",this.props);
        return (
          <Tours tour={tour} key={index} tourDisplayProps={this.props.tourDisplayProps} cancelTourEvent={this.props.cancelTourEvent}/>
      )}, this);

    return (<div>
      {tours}
    </div>);
  }
  /*additional_accomadation={tour.additional_accomadation}
  additional_food={tour.additional_food}
  additional_transport={tour.additional_transport}
  address_city={tour.address_city}
  address_country={tour.address_country}
  address_street={tour.address_street}
  address_suffix={tours.address_suffix}
  address_unit={tours.address_unit}
  address_unit_number={tours.address_unit_number}
  address_zip={tours.address_zip}
  average_rating={tours.average_rating}
  description={tours.description}
  firstStart_date={tours.firstStart_date}
  guides={tours.guides}
  id_rating={tours.id_rating}
  id_tour={tours.id_tour}
  is_deleted={tours.is_deleted}
  lastEnd_date={tours.lastEnd_date}
  max_group_size={tours.max_group_size}
  min_group_size={tours.min_group_size}
  name={tours.name}
  price={tours.price}
  profile_image={tours.profile_image}
  rating_count={tours.rating_count}
  stops={tours.stops}*/
}

function select (state) {
  return {
    //tours: state.SearchReducer.tours,
  };
}

export default ToursList;
