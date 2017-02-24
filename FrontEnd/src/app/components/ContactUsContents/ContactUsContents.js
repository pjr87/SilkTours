import React from 'react'
import ReactDOM from 'react-dom';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Form, Button} from 'react-bootstrap/lib/';



class ContactUsContents extends React.Component{
  render(){
    return(
      <div>
        <br/>
        <Grid>
            <ContactUsContentsDiv />
        </Grid>
      </div>
    );
  }
}




class ContactUsContentsDiv extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      errors: {},
      form: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);



  }

  componentDidMount(){
    var vals = {};
    var fields = ['department', 'fname', 'lname', 'questionComment', 'email'];

    fields.forEach(function(field) {
      vals[field] = '';
    }.bind(this))

    this.setState({form: vals})
  }

  handleSubmit() {
    console.log("clicked");
    if( this.validateInput() )
    {
      console.log("Valid");
    }
    else
    {
      console.log("inValid");
    }

    //console.log("email: " + this.state.['email'].value);
  }

  handleChange(event) {
    let fieldName = event.target.id;
    let fleldVal = event.target.value;
    this.setState({form: {...this.state.form, [fieldName]: fleldVal}})
  }

  validateInput()
  {

    var errors = {};

    var fields = ['department', 'fname', 'lname', 'questionComment', 'email'];

    fields.forEach(function(field) {
      var value = this.state.form[field].trim();
      if (!value) {
        errors[field] = 'This field is required'
      }
    }.bind(this))

    var regex  = /^[a-z][a-zA-Z0-9_+]*(\.[a-zA-Z][a-zA-Z0-9_+]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-zA-Z]+)?$/;

    if( !regex.test( this.state.form['email'].trim().toLowerCase() ) && !errors['email'] )
    {
      errors['email'] = 'Invalid Email Address';
    }

    this.setState({errors: errors})

    console.log("errors:\n"); console.dir(this.state.errors);

    var isValid = true;

    for( var c in errors ){
      isValid = false;
      break;
    }

    return isValid;

  }


  render(){

    function ErrorFunc(props){

      if( props.error == true ){
        return (<HelpBlock>{props.errorText}</HelpBlock>);
      }

      return <div></div>
    }

    return(
        <Form horizontal>
          <FormGroup validationState = {'department' in this.state.errors && 'error' || !('department' in this.state.errors) && null} >
            <Col componentClass={ControlLabel} sm={2}>
            Department
            </Col>
            <Col sm={4}>
              <FormControl componentClass="select" placeholder="select" id="department" onChange={this.handleChange}>
                <option value=""></option>
                <option value="technical">Technical</option>
                <option value="billing">Billing</option>
                <option value="sales">Sales</option>
                <option value="feedback">Feedback</option>
              </FormControl>
              <ErrorFunc error = {'department' in this.state.errors} errorText = {this.state.errors['department']} />
            </Col>
          </FormGroup>

          <FormGroup validationState = {'fname' in this.state.errors && 'error' || !('fname' in this.state.errors) && null}>
            <Col componentClass={ControlLabel} sm={2}>
              First Name
            </Col>
            <Col sm={4}>
              <FormControl type="text" placeholder="First Name" id="fname" onChange={this.handleChange} />
              <ErrorFunc error = {'fname' in this.state.errors} errorText = {this.state.errors['fname']} />
            </Col>
          </FormGroup>
          <FormGroup validationState = {'lname' in this.state.errors && 'error' || !('lname' in this.state.errors) && null}>

            <Col componentClass={ControlLabel} sm={2}>
              Last Name
            </Col>
            <Col sm={4}>
              <FormControl type="text" placeholder="Last Name" id="lname" onChange={this.handleChange} />
              <ErrorFunc error = {'lname' in this.state.errors} errorText = {this.state.errors['lname']} />
            </Col>
          </FormGroup>

          <FormGroup validationState = {'email' in this.state.errors && 'error' || !('email' in this.state.errors) && null}>
            <Col componentClass={ControlLabel} sm={2}>
            Email
            </Col>
            <Col sm={4}>
            <FormControl  type="email" placeholder="Email" id="email" onChange={this.handleChange} />
            <ErrorFunc error = {'email' in this.state.errors} errorText = {this.state.errors['email']} />
            </Col>
          </FormGroup>

          <FormGroup  validationState = {'questionComment' in this.state.errors && 'error' || !('questionComment' in this.state.errors) && null} >
            <Col componentClass={ControlLabel} sm={2}>            
              <ControlLabel>Question / Comment</ControlLabel>
            </Col>
            <Col sm={8}>
              <FormControl componentClass="textarea" placeholder="Question/Comment" id="questionComment"  onChange={this.handleChange} />
              <ErrorFunc error = {'questionComment' in this.state.errors} errorText = {this.state.errors['questionComment']} />
            </Col>
          </FormGroup>

          <FormGroup>
          <Col smOffset={2} sm={10}>
          <Button id="submit" onClick={this.handleSubmit} >
            Submit
          </Button>
          </Col>
          </FormGroup>
         
        </Form>
    );
  }
}

export default ContactUsContents;
