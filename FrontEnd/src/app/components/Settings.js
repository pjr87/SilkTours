
import React from 'react';
import style from './style/style.css';
import Header from './Header';
import Footer from './Footer';
import GetData from '../databaseFunctions';
import {ProfileHeader} from './Profile';

/*const p = {
    lName:"Smith",
    fName:"James",
    profileImage:"null",
    email:"w",
    cell:"w",
    streetAddress:"w",
    streetAddress2:"w",
    city:"w",
    state:"w",
    zip:"w",
    country:"w",
    interests:['basket ball','ping pong']
};*/


const p = {id_users: "1",
address: {
    number: 1600,
    street: "Pennsylvania",
    suffix: "Ave",
    unit: "",
    unit_number: "",
    city: "Washington",
    state: "DC",
    country: "USA",
    zip: "20500"
},
dob: "1946-06-14",
is_guide: true,
first_name: "Donald",
last_name: "Trump",
phone_number: "000-000-0000",
profile_picture: "http://i.imgur.com/vw6zfa1.jpg",
tours_taking: [
    {
        name: "White House Tour",
        tour_id: "1",
        state: "future"
    },
    {
        name: "Trump Tower",
        tour_id: "2",
        state: "completed"
    }
],
tours_guiding: [
    {
        name: "MAGA",
        tour_id: "3",
    }
]
};

class SettingsPg extends React.Component {

  shouldComponentUpdate () {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  render () {

    return (
      <div>
        <Header largeHeader={false} />
        <ProfileHeader profilePicture={this.props.person.profile_picture} name={this.props.person.first_name+" "+this.props.person.last_name}/>

      <div className={style.mainBody}>
        <div className={style.formSection}>
          <div className={style.formHeader}> Personal Information </div>
          <div className={style.formRow}>
            <div className={style.formLabel}> Name </div>
            <div className={style.formField}>
              <div className={style.formInput}>
                <label>First name</label>
                <input type="text" name="first_name" value={this.props.person.first_name} maxLength="60" />
              </div>
              <div className={style.formInput}>
                <label>Last name</label>
                <input type="text" name="last_name" value={this.props.person.last_name} maxLength="60" />
              </div>
          </div>
        </div>
          <div className={style.formRow}>
            <div className={style.formLabel}> Phone Number </div>
            <div className={style.formField}>
              <div className={style.formInput}>

                <input type="text" name="phone" value={this.props.person.phone_number} maxLength="60" />
              </div>

          </div>
          </div>
          <div className={style.formRow}>
            <div className={style.formLabel}> Email</div>
            <div className={style.formField}>
              <div className={style.formInput}>

                <input type="text" name="email" value="{need email field}" maxLength="60" />
              </div>

          </div>
          </div>

          <div className={style.formRow}>
            <div className={style.formLabel}> Address</div>
            <div className={style.formField}>
              <div className={style.formInput}>

                <input type="text" name="address" value={this.props.person.address.number+" "+this.props.person.address.street+" "+this.props.person.address.suffix} maxLength="60" />
              </div>

          </div>
          </div>

          <div className={style.formRow}>
            <div className={style.formLabel}> Apartment / Suite / Unit</div>
            <div className={style.formField}>
              <div className={style.formInput}>

                <input type="text" name="address2" value={this.props.person.address.unit+" "+this.props.person.unit_number} maxLength="60" />
              </div>

          </div>
          </div>


          <div className={style.formRow}>
            <div className={style.formLabel}> City</div>
            <div className={style.formField}>
              <div className={style.formInput}>

                <input type="text" name="city" value={this.props.person.address.city} maxLength="60" />
              </div>

          </div>
          </div>
          <div className={style.formRow}>
            <div className={style.formLabel}> State</div>
            <div className={style.formField}>
              <div className={style.formInput}>

                <input type="text" name="state" value={this.props.person.address.state} maxLength="60" />
              </div>

          </div>
          </div>

          <div className={style.formRow}>
            <div className={style.formLabel}> Zip Code</div>
            <div className={style.formField}>
              <div className={style.formInput}>

                <input type="text" name="zip" value={this.props.person.address.zip} maxLength="60" />
              </div>

          </div>
          </div>

        <div className={style.formSection}>
          <div>Interests Information</div>
          <div >
            <input type="text" placeholder="Search For Interests"/>
            <ul>
              {/*interestList*/}
            </ul>
        </div>
        </div>
    </div>
  </div> </div> );
  }
}

const Settings = () => {
  
  return (<SettingsPg person={GetData.getUser(1)} />);
}
//Profile.propTypes = {
//  person: React.PropTypes.object.isRequired,
//};

export default Settings;
