import React from 'react';
import _ from 'lodash';
import style from '../../style/style.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import {ProfileHeader} from './Profile';
import * as service from '../../utils/databaseFunctions';
//import authStore from "../../stores/AuthStore.js";
import {EditableField, FormTitle, DoubleEditableField, FormButton} from '../forms/Forms.js';
import logoImg from '../../style/images/logo2.png';
import { WithContext as ReactTags } from 'react-tag-input';

class SettingsPg extends React.Component {


  constructor(props) {
     super();
     // initializes component state
     this.state = {
         fetching: false, // tells whether the request is waiting for response or not
         user: {interests:[]},
         warningVisibility: false,
         authProfile: authStore.getProfile()
     };
  }

  //Before component mounts, check login state
  componentWillMount() {
    authStore.on("login", () => {
      this.state.authProfile = authStore.getProfile();
    })

    authStore.on("logout", () => {
      this.state.authProfile = authStore.getProfile();
    })
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

  onSubmitClick(){
    console.log("submit clicked!")
  }

  getUserInfo = async (postId) => {
     try {
       this.state.authProfile = authStore.getProfile();

        service.getUser(this.state.authProfile.id_user).then((function(response){
          console.log("response: ");
          console.log( response.data );
          //var test = {test:""};
          this.setState({
              user:response.data,
              fetching: false // done!
          });
          //console.log("user: " + this.state.user);
        }).bind(this)).catch(function(error){
            console.log("There was a problem\n"+error);
        }).bi;

     } catch(e) {
         // if err, stop at this point
         this.setState({
             fetching: false
         });
         this.showWarning();
     }
  }

  handleDelete(i) {
        var user = this.state.user;
        user.interests.splice(i, 1);
        this.setState({user:user});
    }

    handleAddition(tag) {
        let user = this.state.user;
        user.interests.push({
            id: user.interests.length+1,
            text: tag
        });
        this.setState({user: user});
    }

  renderInterests(){

    const interests = _.map(this.state.user.interests, function(obj) {
      console.log(obj);
      return (<li key={obj.id_interestList}> {obj.name}</li>);
    });
    return (<ul>{interests}</ul>);
  }

  textChange(val, fieldName){
    console.log("text changed!, " + fieldName);
    var u = this.state.user;
    u[fieldName] = val;
    this.setState({tour:u});
  }

  render () {
    const {fetching, user} = this.state;

    return (<div>
        <Header largeHeader={false} fileName={logoImg} />
        <ProfileHeader profilePicture={user.profile_picture} name={user.first_name+" "+user.last_name}/>

      <div className={style.mainBody}>
        <div className={style.formSection}>

        <FormTitle title="Personal Information" />
        <DoubleEditableField update={this.textChange.bind(this)} label1="First Name" label2="Last Name" name1="first_name" name2="last_name" value2={user.last_name} value1={user.first_name} />
        <EditableField update={this.textChange.bind(this)} value={user.phone_number} name="phone_number" label="Phone Number" />
        <EditableField update={this.textChange.bind(this)} value={user.email} name="email" label="Email" />
        <EditableField update={this.textChange.bind(this)} value={user.address_unit_number+" "+user.address_street+" "+user.address_suffix} name="address" label="Address" />
        <EditableField update={this.textChange.bind(this)} value={user.address_unit+" "+user.address_unit_number} name="address2" label="Apartment / Suite / Unit" />
        <EditableField update={this.textChange.bind(this)} value={user.address_city} name="address_city" label="City" />
        <EditableField update={this.textChange.bind(this)} value={user.address_state} name="address_state" label="State" />
        <EditableField update={this.textChange.bind(this)} value={user.address_zip} name="address_zip" label="Zip Code" />


          <div>Interests Information</div>
          <div>
            {/*<input type="text" placeholder="Search For Interests"/>*/}

            {/*this.renderInterests()*/}
            <ReactTags classNames={{
              tags: style.ReactTags__tags,
              tagInput: style.ReactTags__tagInput,
              tagInputField: style.ReactTags__tagInputField,
              selected: style.ReactTags__selected,
              tag: style.ReactTags__tag,
              remove: style.ReactTags__remove,
              suggestions: style.ReactTags__suggestions
            }}
              tags={user.interests}
              handleDelete={this.handleDelete.bind(this)}
              handleAddition={this.handleAddition.bind(this)}
               />
             <br />

        </div>
        <FormButton action={this.onSubmitClick.bind(this)}></FormButton>
    </div>
  </div> </div> );
  }
}

const Settings = () => {

  return (<SettingsPg  />);
}

export default Settings;
