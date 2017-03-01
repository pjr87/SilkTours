import React from 'react';

import {Header, Footer, SearchBar, PageTitle, BannerImage, UserInfo, Interests} from 'components';
import * as service from '../../ajaxServices/AjaxList';
import {FormButton} from '../../components/Forms/Forms.js';

class SettingsPage extends React.Component{

  constructor(props) {
     super();
     // initializes component state
     this.state = {
         fetching: false,
         user: {  address: {
                  city: "fair haven ",
                  country: "",
                  state_code: "",
                  street: "836 ridge road",
                  unit: "",
                  zip: ""
                },
                description: "",
                dob: "",
                email: "meo@gmail.com",
                first_name: "T",
                interests: [{id: 1, text: "sports"}],
                last_name: "S",
                phone_number: "",
                profile_picture: "",
                tours_taking: [],
                tours_teaching: [],
                bypass:true
              },
         warningVisibility: false,
         authProfile: authStore.getProfile()
     };
     //console.log("getProfile: ",authStore.getProfile());
  }


  componentDidMount() {
    this.state.authProfile = authStore.getProfile();
    this.getUserInfo(this.state.authProfile.id_user);
  }

  showWarning = () => {
     this.setState({
         warningVisibility: true
     });

     setTimeout(
         () => {
             this.setState({
                 warningVisibility: false
             });
         }, 1500
     );
  }

objectFixer(obj){
   Object.keys(obj).forEach(key => obj[key] === null ? obj[key]="" : '');
   return obj;
}

getUserInfo = async (postId) => {
   try {
     this.state.authProfile = authStore.getProfile();

      service.getUser(this.state.authProfile.id_user).then((function(response){
        console.log("userBefore: ",response.data);
        var user = this.objectFixer(response.data);
        user.address= this.objectFixer(user.address);

        //var test = {test:""};
        this.setState({
            user:user,
            fetching: false // done!
        });
        console.log("userAfter: ",user);
      }).bind(this)).catch(function(error){
          console.log("There was a problem\n"+error);
      });

   } catch(e) {
       // if err, stop at this point
       this.setState({
           fetching: false
       });
       this.showWarning();
   }
}
onSubmitClick(){
  var tempUser = this.state.user;
  tempUser.bypass = true;
  console.log("submit clicked!->", tempUser);

  service.updateUser(tempUser);
}

  onChange(val, fieldName){
      console.log("text changed!, " + fieldName);
      var u = this.state.user;
      u[fieldName] = val;
      this.setState({user:u});
      console.log("text changed!:", this.state.user);
  }

  onAddressChange(val, fieldName){
      var u = this.state.user;
      console.log("text changed!, " + u.address[fieldName]);
      u.address[fieldName] = val;
      this.setState({user:u});
      console.log("user.address", this.state.user.address)
  }

  tagDelete(i) {
        var user = this.state.user;
        user.interests.splice(i, 1);
        this.setState({user:user});
    }

    tagAddition(tag) {
        var user = this.state.user;
        user.interests.push({
            id: user.interests.length+1,
            text: tag
        });
        this.setState({user: user});
    }

  render(){
    return (
      <div>
        <Header/>
        <br />
        <br />
        <div>
          <PageTitle title= "settings"/>
          <UserInfo user={this.state.user} onUserChange={this.onChange.bind(this)} onAddressChange={this.onAddressChange.bind(this)} formTitle="User Information" />
          <Interests title="Interests" interests={this.state.user.interests} onTagDelete={this.tagDelete.bind(this)} onTagAdd={this.tagAddition.bind(this)}  />
          <FormButton action={this.onSubmitClick.bind(this)}> </FormButton>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default SettingsPage;
