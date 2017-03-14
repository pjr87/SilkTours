
import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss, Redirect } from 'react-router';

import { Button, ControlLabel, Form, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import {BannerImage, PageTitle, ContactUsContents} from 'components';
import {FieldFormControl, FieldFormControlSelect, FieldFormControlTextArea } from '../../components/FieldFormControl/FieldFormControl.js';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {Grid, Row, Col} from 'react-bootstrap/lib';



class ContactUsRedux extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  


  handleSubmit(values)
  {
    console.log("FIRED");
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div>
        <br />
        <br />
        <br />
        <PageTitle title= "Contact Us"/>
        <br/>
        <br/>
        <Grid>
        <Form horizontal>
          <Field type="text" name="department" placeholder="Please enter your Department" component={FieldFormControlSelect} options={['', 'Technical', 'Billing', 'Sales', 'Feedback']}>Department</Field>
          <Field type="text" name="fname" placeholder="Please enter your First Name" component={FieldFormControl}>First Name</Field>
          <Field type="text" name="lname" placeholder="Please enter your Last Name" component={FieldFormControl}>Last Name</Field>
          <Field type="text" name="email" placeholder="Please enter your Email Address" component={FieldFormControl}>Email</Field>
          <Field type="text" name="questionComment" placeholder="Please provide details about your Question/Comment" component={FieldFormControlTextArea}>Question / Comment</Field>
          <Col smOffset={2}>
          <Button id="submit" onClick={handleSubmit(this.handleSubmit)}>Submit</Button>
          </Col>
          
        </Form>
        </Grid>
      </div>
    )
  }
};


function validEmail(email)
{
  var regex  = /^[a-z][a-zA-Z0-9_+]*(\.[a-zA-Z][a-zA-Z0-9_+]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-zA-Z]+)?$/;

    if( regex.test( email.trim().toLowerCase() ) )
    {
      return true;
    }
    return false;
}


function validate(values){
    const errors = {}
    if (!values.fname) {
      errors.fname = 'Required'
    }
    if (!values.lname) {
      errors.lname = 'Required'
    }
    if(!values.department )
    {
      errors.department = 'Required';
    }
    if(!values.questionComment)
    {
      errors.questionComment = 'Required';
    }
    if(!values.email)
    {
      errors.email = 'Required';
    }
    else if(!validEmail(values.email))
    {
      errors.email = 'Invalid Email Address'
    }
    return errors
  }

ContactUsRedux = reduxForm({
  form: 'contact', // a unique name for this form
  validate,
})(ContactUsRedux);


export default ContactUsRedux;