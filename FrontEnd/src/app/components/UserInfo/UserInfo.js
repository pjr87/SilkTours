import React from 'react'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import {EditableField, FormTitle, DoubleEditableField, FormButton} from '../Forms/Forms.js';


export default class UserInfo extends React.Component {
render(){
  return( <div>
    <br />
    <Form horizontal>
        <FormTitle title={this.props.formTitle} />
        <EditableField label="First Name" onChange={this.props.onUserChange} value={this.props.user.first_name} id="first_name" />
        <EditableField label="Last Name" onChange={this.props.onUserChange} value={this.props.user.last_name} id="last_name" />
        <EditableField label="Email" onChange={this.props.onUserChange} value={this.props.user.email} id="email" />
        <EditableField label="Phone" onChange={this.props.onUserChange} value={this.props.user.phone_number} id="phone_number" />
        <EditableField label="Street Address" onChange={this.props.onAddressChange} value={this.props.user.address.street} id="street" />
        <EditableField label="Apartment / Suite / Unit" onChange={this.props.onAddressChange} value={this.props.user.address.unit} id="unit" />
        <EditableField label="City" onChange={this.props.onAddressChange} value={this.props.user.address.city} id="city" />
        <EditableField label="State" onChange={this.props.onAddressChange} value={this.props.user.address.state_code} id="state_code" />
        <EditableField label="Zip Code" onChange={this.props.onAddressChange} value={this.props.user.address.zip} id="zip" />
        <EditableField label="Country" onChange={this.props.onAddressChange} value={this.props.user.address.country} id="country" />
      </Form>
  </div>);
  }
}
