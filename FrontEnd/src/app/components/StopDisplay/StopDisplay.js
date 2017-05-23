import React from 'react';
import {Map} from 'components';
import styles from './styles.css';
import {Table,Glyphicon,Row} from 'react-bootstrap';

export default class StopDisplay extends React.Component{

  renderStops(){
    const stops = this.props.stops.map(function(obj){
        return( <tr key={obj.key}><td className={styles.tblElementStop}>{obj.key+1}</td>
      <td><button onClick={this.moveStop.bind(this,"up",obj.key)}> <Glyphicon glyph="chevron-up" /></button></td>
          <td><button onClick={this.moveStop.bind(this,"down",obj.key)}> <Glyphicon glyph="chevron-down" /></button></td>
          <td><button onClick={this.removeStop.bind(this,obj.key)}> <Glyphicon glyph="remove" /></button></td>
            </tr> );
    },this);

    return ( <tbody>{stops}</tbody>);
  }

  addStop(val){
    //var stops = this.props.stops;
    var k = this.props.stops.length;
    var stop = {
      lat:val.latLng.lat(),
      lon:val.latLng.lng(),
      key: k
    };
    this.props.stops.push(stop);
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
<br/>
      <Table bordered condensed hover className={styles.tableWidth}>
          <thead>
            <tr>
              <th className={styles.tblElementStop}>Stop order</th>
              <th className={styles.tblElementStop}>Move Up</th>
              <th className={styles.tblElementStop}>Move Down</th>
              <th className={styles.tblElementStop}>Delete</th>
            </tr>
          </thead>
          {this.renderStops()}
      </Table>
      </div>
    );
  }
}
