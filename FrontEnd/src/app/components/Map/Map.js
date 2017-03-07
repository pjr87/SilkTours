import React from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

export default class Map extends React.Component{


  render(){

    const markers = this.props.markers.map(function(marker) {
        return (
          <Marker key={ marker.key }
           lat={ marker.data.latLng.lat() }
           lng={ marker.data.latLng.lng() }
           draggable={ true }
           onDragEnd={ this.onDragMarkerEnd.bind(this, marker.key) }
           label={(marker.key+1)+""}
           />
      )}, this);


    return(
      <Gmaps
        width={'800px'}
        height={'600px'}
        lat={39.955980}
        lng={-75.188032}
        zoom={12}
        loadingMessage={'Be happy'}
        params={{v: '3.exp', key: 'AIzaSyA7hW-zSFPnfDssD8pXPbfS6ePP3j0xq98'}}
        onClick={this.props.onMapClicked.bind(this)}>
        {markers}
      </Gmaps>
    );
  }
}
