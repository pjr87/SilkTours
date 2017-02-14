import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import style from '../../style/style.css';

import * as service from '../../ajaxServices/AjaxList';

import logoImg from '../../style/images/logo5.png';


class ContactUs extends React.Component{
	constructor(props) {
		super(props);
		this.state = {  
			email:true, 
			question: true, 
			submitted: null
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	render() {
    var submitted;
    var buttonPlaceholder = <div></div>;
    if (this.state.submitted !== null) {
      submitted = <div className={style.contactSuccess}>
      Thanks for contacting Silk Tours! We appreciate that you’ve taken the time to write us. We’ll get back to you very soon!
      </div>;      
    }
    else
    {
      submitted = <ContactForm ref="contactForm"
              email={this.state.email}
              question={this.state.question}
              company={this.props.company}
            />;

      buttonPlaceholder = <button type="button" className="contactSubmitButton" onClick={this.handleSubmit}>Submit</button>;
    }

    return(
 	    	 <div className= {style.Main}> 
	    <Header fileName={logoImg}/>
	      <div className={style.contactUsMain}>
	        <div className = {style.contactUsForm}>
	        	<h3 className={style.h3Contact}>Contact Us</h3>
	          {submitted}
	        </div>
	        <div>
          {buttonPlaceholder}
	        </div>
	      </div>
	      
	    <Footer />
    </div>

   
    );
  }

  handleChange(){
    var nextState = {}
    nextState[field] = e.target.checked
    this.setState(nextState)
  }

  handleSubmit() {
    if (this.refs.contactForm.isValid()) {
      this.setState({submitted: this.refs.contactForm.getFormData()});

      var data = this.refs.contactForm.getFormData();

      

      service.postSupportTicket(data.department, data.firstName, data.lastName, data.email, data.question);
      
      this.refs.contactForm.clearForm();
    }
  }
}

/**
 * A contact form with certain optional fields.
 */
var ContactForm = React.createClass({
  getDefaultProps: function() {
    return {
      
    }
  }

, getInitialState: function() {
    return {errors: {}}
  }

, emailCheck: function(){

  var regex  = /^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;

  if ( regex.test( this.refs['email'].value ) )//regex.test('shouldFail@gmail.com') ) 
  { 
    console.log("Success222  " + this.refs['email'].value);
    return true; 
  }
    console.log("Failure222 " + this.refs['email'].value);
  return false;


}

, isValid: function() {
    this.refs['email'].value = this.refs['email'].value.toLowerCase();

    var fields = ['firstName', 'lastName', 'email','question', 'ticketOpts' ]

    var errors = {}
    fields.forEach(function(field) {
      var value = trim(this.refs[field].value)
      if (!value) {
        errors[field] = 'This field is required'
      }
    }.bind(this))


    var emailEmpty = !trim(this.refs['email'].value);
    if( !this.emailCheck() && !emailEmpty) 
    {
      errors['email'] = 'invalid'
      this.setState({invalidEmail: true});
    }
    else
    {
      this.setState({invalidEmail: false});
    }

    this.setState({errors: errors})

    var isValid = true
    for (var error in errors) {
      isValid = false
      break
    }
    return isValid
  }

, getFormData: function() {
    var data = {
      firstName: this.refs.firstName.value
    , lastName: this.refs.lastName.value
    , email: this.refs.email.value
    , question: this.refs.question.value
    , department: this.refs.ticketOpts.value
    }

    return data
  }
, clearForm: function() {

  this.refs.firstName.value = "";
  this.refs.lastName.value = "";
  this.refs.email.value = "";
  this.refs.question.value = "";
  this.refs.ticketOpts.value = null;
}
, componentDidMount: function(){
  window.scrollTo(0,0);
}


, render: function() {

	function ErrorFunc(props){

		const isError = props.isError;

    if( props.isEmail )
    {
      if( props.invalidEmail)
      {
        return(<div className={style.errorText}>Invalid Email Address</div>);
      }
    }

    if( isError )
		{
			return(<div className={style.errorText}>Field Required</div>);
		}
		return null;
	}

    return (
    	<div>



    <div className="form-control">
    	<div className={$c(style['contactGroup'], {'has-error': 'ticketOpts' in this.state.errors})}>
			<label className={style.contactLine} htmlFor={'Department'}>{'Department'}</label>
			<div className={style.contactInput}>
				<select className={style['form-control']} id={'ticketOpts'} ref={'ticketOpts'}>
          <option value={null}></option>
					<option value={'Technical'}>{'Technical'}</option>
					<option value={'Sales'}>{'Sales'}</option>
					<option value={'Billing'}>{'Billing'}</option>
					<option value={'Feedback'}>{'Feedback'}</option>
				</select>
        <ErrorFunc isError={'ticketOpts' in this.state.errors} />
			</div>
		</div>



    	<div className={$c(style['contactGroup'], {'has-error': 'firstName' in this.state.errors})}>
			<label className={style.contactLine} htmlFor={'firstName'}>{'First Name'}</label>
			<div className={style.contactInput}>
				<input type="text" className={style.contactUsForm} id={'firstName'} ref='firstName'/>
				<ErrorFunc isError={'firstName' in this.state.errors} />
			</div>
			
		</div>




		<div className={$c(style['contactGroup'], {'has-error': 'lastName' in this.state.errors})}>
			<label className={style.contactLine} htmlFor={'lastName'}>{'Last Name'}</label>
			<div className={style.contactInput}>
				<input type="text" className={style.contactUsForm} id={'lastName'} ref={'lastName'}/>
				<ErrorFunc isError={'lastName' in this.state.errors} />
			</div>
		</div>




		<div className={$c(style['contactGroup'], {'has-error': 'email' in this.state.errors})}>
			<label className={style.contactLine} htmlFor={'email'}>{'Email Address'}</label>
			<div className={style.contactInput}>
				<input type="text" className={style.contactUsForm} id={'email'} ref={'email'}/>
				<ErrorFunc isError={'email' in this.state.errors} isEmail={true} invalidEmail={this.state.invalidEmail} />
			</div>
		</div>




		<div className={$c(style['contactGroup'], {'has-error': 'question' in this.state.errors})}>
			<label className={style.contactLine} htmlFor={'question'}>{'Questions/Comments'}</label>
			<div className={style.contactInput}>
				<textarea className={style.contactUsTextBox} id={'question'} ref={'question'}/>
				<ErrorFunc isError={'question' in this.state.errors} />
			</div>
		</div>
	  </div>
    </div>);
  }

, renderTextInput: function(id, label) {
    return this.renderField(id, label,
      <input type="text" className={style.contactUsForm} id={id} ref={id}/>
    )
  }

, renderEmailInput: function(id, label){
	return this.renderField(id, label, <input type="text" className={style.contactUsForm} id={id} ref={id}/> )
}

, renderTextarea: function(id, label) {
    return this.renderField(id, label,
      <textarea className={style.contactUsTextBox} id={id} ref={id}/>
    )
  }

, renderSelect: function(id, label, values) {
    var options = values.map(function(value) {
      return <option value={value}>{value}</option>
    })
    return this.renderField(id, label,
      <select className={style['form-control']} id={id} ref={id}>
        {options}
      </select>
    )
  }

, renderRadioInlines: function(id, label, kwargs) {
    var radios = kwargs.values.map(function(value) {
      var defaultChecked = (value == kwargs.defaultCheckedValue)
      return <label className="radio-inline">
        <input type="radio" ref={id + value} name={id} value={value} defaultChecked={defaultChecked}/>
        {value}
      </label>
    })
    return this.renderField(id, label, radios)
  }

, renderField: function(id, label, field) {
    return 
    <div className={$c(style['contactGroup'], {'has-error': id in this.state.errors})}>
      <label className={style.contactLine} htmlFor={id}>{label}</label>
      <div>
        {field}
    </div>
    </div>
  }
})


// Utils

var trim = function() {
  var TRIM_RE = /^\s+|\s+$/g
  return function trim(string) {
    return string.replace(TRIM_RE, '')
  }
}()

function $c(staticClassName, conditionalClassNames) {
  var classNames = []
  if (typeof conditionalClassNames == 'undefined') {
    conditionalClassNames = staticClassName
  }
  else {
    classNames.push(staticClassName)
    classNames.push(style['has-error'])
  }
  return classNames.join(' ')
}

export default ContactUs;
