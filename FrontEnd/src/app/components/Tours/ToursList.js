import React from 'react';
import {Tours} from 'components';

class ToursList extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    const tours = this.props.tours.map(function(tour,index) {
      return (
            <Tours tour={tour} key={index} tourDisplayProps={this.props.tourDisplayProps}/>
      )
    }, this);


    return (<div>
      {tours}
    </div>);
  }
}

export default ToursList;
