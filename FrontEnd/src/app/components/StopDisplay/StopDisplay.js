import React from 'react';
import {Map} from 'components';

export default class StopDisplay extends React.Component{

  renderStops(){

    const stops = this.props.stops.map(function(obj){
        return(<li key={obj.key}> {"stop "+(obj.key+1)+": "+obj.data.latLng.lat()+", "+obj.data.latLng.lng()}
          <button onClick={this.moveStop.bind(this,"up",obj.key)}> move up </button>
            <button onClick={this.moveStop.bind(this,"down",obj.key)}> move down </button>
            <button onClick={this.removeStop.bind(this,obj.key)}> remove </button>
            </li>);
    },this);

    return ( <ul>{ stops }</ul> );
  }

  addStop(val){
    var stops = this.props.stops;
    //console.log("addstop, tour:",this.props.stops;
    var k=stops.length;
    var stop = {data:val, key:k};
    stops.push(stop);
    this.props.updateStops(stops);
    // this.setState({
    //     tour:tour
    // });
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
    var stops = this.props.stop;
    var temp = stops[s1];
    temp.key=s2;
    stops[s2].key=s1;
    stops[s1]=stops[s2];
    stops[s2]=temp;
    //console.log("swapstopstour", tour)
    this.props.updateStops(stops);
  }

  render(){
    return(
      <div>
        <Map markers={this.props.stops} onMapClicked={this.addStop.bind(this)} />
        {this.renderStops()}
      </div>
    );
  }
}
