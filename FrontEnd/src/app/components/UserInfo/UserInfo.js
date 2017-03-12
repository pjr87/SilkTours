import React from 'react'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import {EditableField, FormTitle, DoubleEditableField, FormButton} from '../Forms/Forms.js';
import { updateUserState, updateAddressState } from '../../actions/AuthActions';

export default class UserInfo extends React.Component {
  constructor(){
    super();

    this._changeFirstName = this._changeFirstName.bind(this)
    this._changeLastName = this._changeLastName.bind(this)
    this._changeStreet = this._changeStreet.bind(this)
    this._changeUnit = this._changeUnit.bind(this)
    this._changeCity = this._changeCity.bind(this)
    this._changeState = this._changeState.bind(this)
    this._changeZip = this._changeZip.bind(this)
    this._changeCountry = this._changeCountry.bind(this)
  }

  _changeFirstName(event) {
    this._emitUserChange({...this.props.user, first_name: event.target.value});
  }

  _changeLastName(event) {
    this._emitUserChange({...this.props.user, last_name: event.target.value});
  }

  _changeStreet(event) {
    this._emitAddressChange({...this.props.user.address, street: event.target.value});
  }

  _changeUnit(event) {
    this._emitAddressChange({...this.props.user.address, unit: event.target.value});
  }

  _changeCity(event) {
    this._emitAddressChange({...this.props.user.address, city: event.target.value});
  }

  _changeState(event) {
    this._emitAddressChange({...this.props.user.address, state_code: event.target.value});
  }

  _changeZip(event) {
    this._emitAddressChange({...this.props.user.address, zip: event.target.value});
  }

  _changeCountry(event) {
    this._emitAddressChange({...this.props.user.address, country: event.target.value});
  }

  _emitUserChange (newUserState) {
    this.props.dispatch(updateUserState(newUserState))
  }

  _emitAddressChange (newAddressState) {
    this.props.dispatch(updateAddressState(newAddressState))
  }

  render(){
    if(this.props.user.address != null){
      return(
        <div>
          <br />
          <br />
          <Form horizontal>
            <FormTitle title={this.props.formTitle} />
            <EditableField label="First Name" onChange={this._changeFirstName} value={this.props.user.first_name}/>
            <EditableField label="Last Name" onChange={this._changeLastName} value={this.props.user.last_name}/>
            <EditableField label="Email" value={this.props.user.email}/>
            <EditableField label="Phone" value={this.props.user.phone_number}/>
            <EditableField label="Street Address" onChange={this._changeStreet} value={this.props.user.address.street}/>
            <EditableField label="Apartment / Suite / Unit" onChange={this._changeUnit} value={this.props.user.address.unit}/>
            <EditableField label="City" onChange={this._changeCity} value={this.props.user.address.city}/>
            <EditableField label="State" onChange={this._changeState} value={this.props.user.address.state_code}/>
            <EditableField label="Zip Code" onChange={this._changeZip} value={this.props.user.address.zip}/>
            <EditableField label="Country" onChange={this._changeCountry} value={this.props.user.address.country}/>
          </Form>
        </div>
      );
    }
    else{
      return(
        <div>
          <br />
          <br />
          <Form horizontal>
            <FormTitle title={this.props.formTitle} />
            <EditableField label="First Name" onChange={this._changeFirstName} value={this.props.user.first_name}/>
            <EditableField label="Last Name" onChange={this._changeLastName} value={this.props.user.last_name}/>
            <EditableField label="Email" value={this.props.user.email}/>
            <EditableField label="Phone" value={this.props.user.phone_number}/>
            <EditableField label="Street Address" onChange={this._changeStreet} value=""/>
            <EditableField label="Apartment / Suite / Unit" onChange={this._changeUnit} value=""/>
            <EditableField label="City" onChange={this._changeCity} value=""/>
            <EditableField label="State" onChange={this._changeState} value=""/>
            <EditableField label="Zip Code" onChange={this._changeZip} value=""/>
            <EditableField label="Country" onChange={this._changeCountry} value=""/>
          </Form>
        </div>
        );
    }
  }
}

UserInfo.propTypes = {
  formTitle: React.PropTypes.string,
  user: React.PropTypes.object,
  dispatch: React.PropTypes.func,
}
