import React from 'react';
import ReactDOM from 'react-dom';
import style from './style/style.css';

const p = {
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

};

class ProfileComp extends React.Component {

  shouldComponentUpdate () {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }


  render () {
    var interests = this.props.person.interests;
    var interestList = interests.map((interests) =>
      <li>{interests}</li>
    );

    return (
      <div className={style.infoPanel}>
        <h1>{this.props.person.fName} {this.props.person.lName}</h1>
        <img src={this.props.person.profileImage} />
        <div className={style.formSection}>
          <div>Personal Information</div>
          <div className={style.formRow}>
            <input type="text" placeholder="First Name" value={this.props.person.fName} />
            <input type="text" placeholder="Last Name" value={this.props.person.lName} />
          </div>
          <div className={style.formRow}>
            <input type="text" placeholder="Email Address" value={this.props.person.email} />
            <input type="text" placeholder="Cell Phone Number" value={this.props.person.cell} />
          </div>
          <div className={style.formRow}>
            <input className={style.leftInput} type="text" placeholder="Street Address" value={this.props.person.streetAddress} />
            <input type="text" placeholder="Apartment / Suite / Unit" value={this.props.person.streetAddress2} />
          </div>
          <div className={style.formRow}>
            <input type="text" placeholder="City" value={this.props.person.city} />
            <input type="text" placeholder="State" value={this.props.person.state} />
          </div>
          <div className={style.formRow}>
            <input type="text" placeholder="Zip Code" value={this.props.person.zip} />
            <input type="text" placeholder="Zip Code" value={this.props.person.country} />
          </div>
        </div>
        <div className={style.formSection}>
          <div>Interests Information</div>
          <div className="">
            <input type="text" placeholder="Search For Interests"/>
            <ul>
              {interestList}
            </ul>
          </div>
        </div>
      </div>);
  }
}

const Profile = () => {
  return (<ProfileComp person={p} />);
}
//Profile.propTypes = {
//  person: React.PropTypes.object.isRequired,
//};

export default Profile;
