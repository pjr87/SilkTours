import React from 'react';

import {Header, Footer, PageTitle, BannerImage, Interests, TourModify} from 'components';
import * as service from '../../ajaxServices/AjaxList';
import {FormButton} from '../../components/Forms/Forms.js';
import style from './style.css';

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
        street:"NanJing Rd",
        unit:"the unit",
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
      rating_count: 4,
      interests:[],
      stops: []
     }

     };
     //console.log("getProfile: ",authStore.getProfile());
  }


  componentWillMount() {
    authStore.on("login", () => {
      this.state.authProfile = authStore.getProfile();
    })

    authStore.on("logout", () => {
      this.state.authProfile = authStore.getProfile();
    })
  }



objectFixer(obj){
   Object.keys(obj).forEach(key => obj[key] === null ? obj[key]="" : '');
   return obj;
}


onSubmitClick(){
  var tempTour = this.state.tour;
  tempTour.bypass = true;
  console.log("submit clicked!->",tempTour);

  //service.updateUser(tempUser);
}

  onChange(val, fieldName){
      console.log("text changed!, " + fieldName);
      var u = this.state.tour;
      u[fieldName] = val;
      this.setState({tour:u});
  }

  onAddressChange(val, fieldName){
      console.log("text changed!, " + fieldName);
      var u = this.state.tour;
      u.address[fieldName] = val;
      this.setState({tour:u});
      console.log("tour.address", this.state.tour.address)
  }

  tagDelete(i) {
        var tour = this.state.tour;
        tour.interests.splice(i, 1);
        this.setState({tour:tour});
    }

    tagAddition(tag) {
        let tour = this.state.tour;
        tour.interests.push({
            id: tour.interests.length+1,
            text: tag
        });
        this.setState({tour: tour});
    }

  render(){
    return (
      <div>
        <Header/>
        <br />
        <br />
        <div className={style.mainBody}>
          <PageTitle title= "tour creation"/>

          <TourModify formTitle="Tour Creation" tour={this.state.tour} />
          <Interests title="Tags" interests={this.state.tour.interests} onTagDelete={this.tagDelete.bind(this)} onTagAdd={this.tagAddition.bind(this)}  />

          <FormButton action={this.onSubmitClick.bind(this)}></FormButton>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default TourCreationPage;
