import React from 'react';

import {Header, Footer, PageTitle, BannerImage, Interests, TourModify} from 'components';
import {FormButton} from '../../components/Forms/Forms.js';
import style from './style.css';
import * as service from '../../utils/databaseFunctions';

class TourCreationPage extends React.Component{

  constructor(props) {
     super();
     // initializes component state
     this.state = {
         fetching: false,
         tour: {
        additional_accomadation: "hotel",
        additional_food: "seafood",
        additional_transport: "cars",
        address:{
          city:"Shanghai",
          country:"China",
          state_code:"State",
          street:"NanJing Rd",
          unit:"The Unit",
          zip:"07760"},
        average_rating: 3.0,
        description: "Tour to Shanghai",
        firstStart_date: "2016-05-03",
        guides: [],
        id_rating: null,
        is_deleted: false,
        lastEnd_date: "2016-10-24",
        max_group_size: 10,
        min_group_size: 1,
        name: "Shanghai Tour",
        price: 50.0,
        profile_image: "https://s-media-cache-ak0.pinimg.com/736x/cf/b7/8c/cfb78c43479fa5f515444b9f857ea8ec.jpg",
        profile_image_height: 726,
        profile_image_width: 500,
        date: 500,
        time: 500,
        rating_count: 4,
        interests:[],
        stops: []
       }
     };
  }

objectFixer(obj){
   Object.keys(obj).forEach(key => obj[key] === null ? obj[key]="" : '');
   return obj;
}


onSubmitClick(){
  var tempTour = this.state.tour;

  tempTour.bypass = true;
  console.log("submit clicked!->",tempTour);

  service.newTour(tempTour);
}

  onChange(val, fieldName){
      console.log("text changed!, " + fieldName);
      var u = this.state.tour;
      u[fieldName] = val;
      this.setState({tour:u});
  }

  onAddressChange(val, fieldName){
      console.log("address text changed!, " + fieldName);
      var t = this.state.tour;
      t.address[fieldName] = val;
      this.setState({tour:t});
      console.log("tour.address", this.state.tour.address)
  }

    updateStops(s){
      var t = this.state.tour;
      t.stops = s;
      this.setState({tour: t});
    }

    updateInterests(i){
        var tour = this.state.tour;
        tour.interests = i;
        this.setState({tour});
    }

  render(){
    return (
      <div>
        <br />
        <br />
        <div className={style.mainBody}>
          <PageTitle title= "tour creation"/>
          <TourModify updateInterests={this.updateInterests.bind(this)} updateStops={this.updateStops.bind(this)} onTourChange={this.onChange.bind(this)} onAddressChange={this.onAddressChange.bind(this)} formTitle="Tour Creation" tour={this.state.tour} />
          <FormButton action={this.onSubmitClick.bind(this)}></FormButton>
        </div>
      </div>
    );
  }
}

export default TourCreationPage;
