import React from 'react';
import _ from 'lodash';
import style from '../../style/style.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
//import GetData from '../../databaseFunctions';
import {ProfileHeader} from './Profile';
import * as service from '../../ajaxServices/AjaxList';
import {EditableField, FormTitle, DoubleEditableField} from '../forms/Forms.js';
import logoImg from '../../style/images/logo2.png';

class SettingsPg extends React.Component {


  constructor(props) {
     super();
     // initializes component state
     this.state = {
         fetching: false, // tells whether the request is waiting for response or not
         user: {},
         warningVisibility: false
     };
  }

  componentDidMount() {
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

  getUserInfo = async (postId) => {
     /*this.setState({
         fetching: true
     });
*/
     try {
    
        service.getUser(1).then((function(response){
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
    const interests=<div></div>;
      if(user.interests){
    const interests = user.interests.map(
        (name, index)=>(
            <li>
              {name}
            </li>
        )
    );
}

    return (
      <div>
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

        <div className={style.formSection}>
          <div>Interests Information</div>
          <div>
            <input type="text" placeholder="Search For Interests"/>

            {this.renderInterests()}

        </div>
        </div>
    </div>
  </div> </div> );
  }
}

const Settings = () => {

  return (<SettingsPg  />);
}

export default Settings;
