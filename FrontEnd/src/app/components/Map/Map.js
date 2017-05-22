import React from 'react';
import { connect } from 'react-redux';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

class Map extends React.Component{
  render(){
    const markers = this.props.markers.map(function(marker) {
        return (
          <Marker key={ marker.key }
           lat={ marker.lat }
           lng={ marker.lon }
           draggable={ true }
           onDragEnd={ this.props.onMarkerDragged.bind(this, marker.key) }
           label={(marker.key+1)+""}
           />
      )}, this);


    return(
      <Gmaps
        width={'95%'}
        height={'500px'}
        lat={this.props.coords.lat}
        lng={this.props.coords.lng}
        zoom={12}
        loadingMessage={'Be happy'}
        params={{v: '3.exp', key: 'AIzaSyA7hW-zSFPnfDssD8pXPbfS6ePP3j0xq98'}}
        onClick={this.props.onMapClicked.bind(this)}>
        {markers}
      </Gmaps>
    );
  }
}

Map.propTypes = {
  coords: React.PropTypes.object,
}

function select (state) {
  return {
    coords: state.TourCreationReducer.coords
  };
}

export default connect(select)(Map);
