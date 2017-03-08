import React from 'react';
import {Header, Footer, SearchBar, PageTitle, BannerImage, UserInfo, ProfileHeader, Interests} from 'components';
import * as service from '../../utils/databaseFunctions';
import {FormButton} from '../../components/Forms/Forms.js';
import {connect} from 'react-redux';

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
                tours_teaching: []
              },
         warningVisibility: false
     };
  }


  componentDidMount() {
    console.log("test",this.props.id_user);
    this.getUserInfo(1);
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

getUserInfo(){
   try {
     console.log("userBeforetest ");
      service.getUser(this.props.id_user, this.props.auth).then((function(response){
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
  tempUser.Logins = this.props.auth.Logins;
  tempUser.identityID = this.props.auth.identityID;
  console.log("submit clicked!->", tempUser);
  service.updateExistingUser(this.props.id_user, tempUser);
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
      var a = this.state.user.address;
      a[fieldName] = val;
      u.address = a;
      this.setState({user:u});
      console.log("user.address", this.state.user.address)
  }

  // tagDelete(i) {
  //       var user = this.state.user;
  //       user.interests.splice(i, 1);
  //       this.setState({user:user});
  //   }
  //
  //   tagAddition(tag) {
  //       var user = this.state.user;
  //       user.interests.push({
  //           id: user.interests.length+1,
  //           text: tag
  //       });
  //       this.setState({user: user});
  //   }

    updateInterests(i){
        var user = this.state.user;
        user.interests = i;
        this.setState({user});
    }

  render(){
    return (
      <div>
        <BannerImage/>
        <br />
        <br />
        <div>
          <ProfileHeader  name={this.state.first_name+" "+this.state.last_name} profilePicture={this.state.profile_picture}/>
          <PageTitle title= "settings" />
          <UserInfo user={this.state.user} onUserChange={this.onChange.bind(this)} onAddressChange={this.onAddressChange.bind(this)} formTitle="User Information" />
          <Interests title="Interests" interests={this.state.user.interests} onChange={this.updateInterests.bind(this)} />
          <FormButton action={this.onSubmitClick.bind(this)}> </FormButton>
        </div>

      </div>
    );
  }
}

function select (state) {
  return {
    id_user: state.AuthReducer.user.id_user,
    auth:state.AuthReducer.auth
  };
}


export default connect(select)(SettingsPage);
