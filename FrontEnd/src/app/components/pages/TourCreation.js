import React from 'react';
import style from '../../style/style.css';
import {EditableField, FormTitle, FormButton} from '../forms/Forms.js';
import Header from '../header/Header.js';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import * as service from '../../ajaxServices/AjaxList';

const originalTour = {
  name:"n",
  address_city:"c",
  tags:[],
  date:"date",
  time:"time",
  media:[],
  additional_accomadation: null,
  additional_food: null,
  additional_transport: null,
  address_country: "mnm",
  address_street: null,
  address_suffix: null,
      address_unit: null,
      address_unit_number: null,
      address_zip: null,
      average_rating: null,
      description: "description",
      firstStart_date: null,
      id_guide: null,
      id_rating: null,
      id_tour: 29,
      is_deleted: false,
      lastEnd_date: null,
      max_group_size: 0,
      min_group_size: 0,
      price: 0.0,
      profile_image: "http://english.tw/wp-content/themes/qaengine/img/default-thumbnail.jpg",
    profile_image_height: 480,
      profile_image_width: 640,
      rating_count: 0,
      stops: []
    }
}

export default class TourCreation extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      tour:originalTour
    }
    console.log("tour", originalTour);
  }

  componentDidMount(){

  }

  onSubmitClick(){
    console.log("onSubmitClicked!");
    try{
      service.newTour(this.state.tour).then(function(response){
        console.log("response", response.status);
      });
    }catch(e){
      console.log("user is not logged in!!");
    };
  }

  textChange(v, name){
    console.log("text changed!, "+name);
    var t = this.state.tour;
    t[name] = v;
    this.setState( {tour:t} );
  }

  onMapClicked(e){
    console.log('onClick', e);
    this.addstop(e);
  }

  renderstops(){
    console.log("renderstops: ", this.state.tour.stops);

    const stops = this.state.tour.stops.map(function(obj){
        return(<li key={obj.key}> {"stop "+(obj.key+1)+": "+obj.data.latLng.lat()+", "+obj.data.latLng.lng()}
          <button onClick={this.moveStop.bind(this,"up",obj.key)}> move up </button>
            <button onClick={this.moveStop.bind(this,"down",obj.key)}> move down </button>
            <button onClick={this.removeStop.bind(this,obj.key)}> remove </button>
            </li>);
    },this);

    return ( <ul>{ stops }</ul> );
  }

  onDragMarkerEnd(k, e){
    //console.log("drag end", e);
    //console.log("drag key", k);

    var tour = this.state.tour;
    //console.log("movestop, tour:",this.state.tour.stops);
    var stop = {data:e, key:k};
    tour.stops[k]=stop;
    this.setState({
        tour:tour
    });
    //console.log("movestop, tour:",this.state.tour.stops);

  }
  swapStops(s1, s2){
    var tour = this.state.tour;
    var temp = tour.stops[s1];
    temp.key=s2;
    tour.stops[s2].key=s1;
    tour.stops[s1]=tour.stops[s2];
    tour.stops[s2]=temp;
    console.log("swapstopstour", tour)
    this.setState({
        tour:tour
    });
  }

  removeStop(key){
    var tour = this.state.tour;
    var temp = tour.stops[s1];
    temp.key=s2;
    tour.stops[s2].key=s1;
    tour.stops[s1]=tour.stops[s2];
    tour.stops[s2]=temp;
    console.log("swapStopstour", tour)
    this.setState({
        tour:tour
    });
  }

  moveStop(dir, key){
    if(dir=="up" && key!=0){
      this.swapstops(key, key-1);
      return true;
    }
    else if(dir=="down" && key!=this.state.tour.stops.length-1 ){
      this.swapstops(key, key+1);
    }
  }

  renderMap(){

    const markers = this.state.tour.stops.map(function(obj) {
                return (
                  <Marker key={ obj.key }
                   lat={ obj.data.latLng.lat() }
                   lng={ obj.data.latLng.lng() }
                   draggable={ true }
                   onDragEnd={ this.onDragMarkerEnd.bind(this, obj.key) }
                   label={(obj.key+1)+""}
                   />
                )}, this);
    // const stopName = this.state.tour.stops.map(function(obj) {
    //           return (
    //         <InfoWindow
    //           lat={obj.data.latLng.lat()}
    //           lng={obj.data.latLng.lng()}
    //           content={(obj.key+1)}
    //         /> )},this);

    return (<Gmaps
      width={'800px'}
      height={'600px'}
      lat={39.955980}
      lng={-75.188032}
      zoom={12}
      loadingMessage={'Be happy'}
      params={{v: '3.exp', key: 'AIzaSyA7hW-zSFPnfDssD8pXPbfS6ePP3j0xq98'}}
      onClick={this.onMapClicked.bind(this)}>
      {markers}
    </Gmaps>);

  }

  addStop(val){
    var tour = this.state.tour;
    console.log("addstop, tour:",this.state.tour);
    var k=tour.stops.length;
    var stop = {data:val, key:k};
    tour.stops.push(stop);
    this.setState({
        tour:tour
    });
  }

  render(){
    var tour = this.state.tour;
    return ( <div>
        <Header largeHeader={false}/>
        <div className={style.mainBody}>
          <div className={style.formSection} >
            <FormTitle title="New Tour" />
            <EditableField update={this.textChange.bind(this)} value={tour.name} label="Tour Name" name="tour_name"/>
            <EditableField update={this.textChange.bind(this)} value={tour.address_city} label="City" name="address_city"/>
            <EditableField update={this.textChange.bind(this)} value={tour.address_state} label="State" name="address_state"/>
            <EditableField update={this.textChange.bind(this)} value={tour.address_country} label="Country" name="address_country"/>
            <EditableField update={this.textChange.bind(this)} value={tour.min_group_size} label="Min Group Size" name="min_group_size"/>
            <EditableField update={this.textChange.bind(this)} value={tour.max_group_size} label="Max Group Size" name="max_group_size"/>
            <EditableField update={this.textChange.bind(this)} value={tour.date} label="Date" name="date"/>
            <EditableField update={this.textChange.bind(this)} value={tour.time} label="Time" name="time"/>
            <EditableField update={this.textChange.bind(this)} value={tour.description} label="Description" name="description"/>
            <EditableField update={this.textChange.bind(this)} value={tour.price} label="Price Per Person" name="price"/>

            {this.renderMap()}

            <div>
              {this.renderstops()}
            </div>
            <FormButton action={this.onSubmitClick.bind(this)} />
          </div>
        </div>
    </div> );
  }

}
