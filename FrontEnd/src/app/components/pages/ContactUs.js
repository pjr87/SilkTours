import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import style from '../../style/style.css';

//import bootStrapStyle from '../../style/bootstrap.min.css';
//import bsStyle from 'bootstrap/dist/css/bootstrap.min.css';

var htmlContent = require('../Messages/sample/fullview.html'); 


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
    var submitted
    if (this.state.submitted !== null) {
      submitted = <div className="alert alert-success">
        <p>ContactForm data:</p>
        <pre><code>{JSON.stringify(this.state.submitted, null, '  ')}</code></pre>
      </div>
    }

    return(
 	    	 <div className= {style.Main}> 
	    <Header fileName={logoImg}/>
	      <div className={style.contactUsMain}>
	        <div className = {style.contactUsForm}>
	        	<h3 className={style.h3Contact}>Contact Us</h3>
	          <ContactForm ref="contactForm"
	            email={this.state.email}
	            question={this.state.question}
	            company={this.props.company}
	          />
	        </div>
	        <div>
	          <button type="button" className="contactSubmitButton" onClick={this.handleSubmit}>Submit</button>
	        </div>
	      </div>
	      {submitted}
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

      console.log(this.refs.contactForm.getFormData());
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

, isValid: function() {
    var fields = ['firstName', 'lastName', 'email','question', 'ticketOpts' ]

    var errors = {}
    fields.forEach(function(field) {
      var value = trim(this.refs[field].value)
      if (!value) {
        errors[field] = 'This field is required'
      }
    }.bind(this))



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


, render: function() {

	function ErrorFunc(props){
		console.log("props:" + props);
		const isError = props.isError;
		if( isError )
		{
			return(<div className={style.errorText}>Field Required</div>);
		}
		return null;
	}

	function checkEmail(){
		var regex  = /^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;

		if ( regex.test('shouldFail@gmail.com') ) 
		{ 
			console.log("Success");
			return(<div>"Success"</div>); 
		}
		else
		{
			console.log("Failure");
			return(<div>"Failure"</div>);
		}

		return( <div>"error"</div>);
	}


    return (
    	<div>



    <div className="form-control">
    	<div className={$c(style['contactGroup'], {'has-error': 'ticketOpts' in this.state.errors})}>
			<label className={style.contactLine} htmlFor={'Department'}>{'Department'}</label>
			<div className={style.contactInput}>
				<select className={style['form-control']} id={'ticketOpts'} ref={'ticketOpts'}>
					<option value={'Technical'}>{'Technical'}</option>
					<option value={'Sales'}>{'Sales'}</option>
					<option value={'Billing'}>{'Billing'}</option>
					<option value={'Feedback'}>{'Feedback'}</option>
				</select>
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
				<ErrorFunc isError={'email' in this.state.errors} />
			</div>
		</div>




		<div className={$c(style['contactGroup'], {'has-error': 'question' in this.state.errors})}>
			<label className={style.contactLine} htmlFor={'question'}>{'Questions/Comments'}</label>
			<div className={style.contactInput}>
				<textarea className={style.contactUsTextBox} id={'question'} ref={'question'}/>
				<ErrorFunc isError={'question' in this.state.errors} />
			</div>
		</div>

		<div>
			<checkEmail value={'test'}/>
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
