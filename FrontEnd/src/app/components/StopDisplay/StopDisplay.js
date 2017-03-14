import React from 'react';
import {Map} from 'components';

export default class StopDisplay extends React.Component{

  renderStops(){
    console.log("this.props.stops", this.props.stops);
    const stops = this.props.stops.map(function(obj){
        return(<li key={obj.key}> {"stop "+(obj.key+1)+": "+obj.lat+", "+obj.lon}
          <button onClick={this.moveStop.bind(this,"up",obj.key)}> move up </button>
            <button onClick={this.moveStop.bind(this,"down",obj.key)}> move down </button>
            <button onClick={this.removeStop.bind(this,obj.key)}> remove </button>
            </li>);
    },this);

    return ( <ul>{ stops }</ul> );
  }

  addStop(val){
    var stops = this.props.stops;
    console.log("addstop, tour:",val);
    console.log("addstop, tour:",val.latLng.lat());
    console.log("addstop, tour:",val.latLng.lng());
    var k=stops.length;
    var stop = {
      lat:val.latLng.lat(),
      lon:val.latLng.lng(),
      key: k
    };
    stops.push(stop);
    this.props.updateStops(this.props.stops);
  }

  removeStop(key){
    var stops = this.props.stops;
    var i = 0;
    for(i=0; i<stops.length; i++){
      if(i > key){
        stops[i].key--;
      }
    }
    stops.splice(key, 1);

    //console.log("deleteStopstour: ", tour);
    this.props.updateStops(stops);
  }

  moveStop(dir, key){
    if(dir=="up" && key!=0){
      this.swapStops(key, key-1);
      return true;
    }
    else if(dir=="down" && key!=this.props.stops.length-1 ){
      this.swapStops(key, key+1);
    }
  }

  swapStops(s1, s2){
    var stops = this.props.stops;
    var temp = stops[s1];
    temp.key=s2;
    stops[s2].key=s1;
    stops[s1]=stops[s2];
    stops[s2]=temp;
    //console.log("swapstopstour", tour)
    this.props.updateStops(stops);
  }

  onDragMarkerEnd(k, e){
    var stops = this.props.stops;

    var stop = {data:e, key:k};
    stops[k]=stop;
    this.props.updateStops(this.props.stops);
  }

  render(){
    return(
      <div>
        <Map markers={this.props.stops} onMarkerDragged={this.onDragMarkerEnd.bind(this)} onMapClicked={this.addStop.bind(this)} />
        {this.renderStops()}
      </div>
    );
  }
}
