
import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss, Redirect } from 'react-router';

import { Button, ControlLabel, Form, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import { connect } from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap/lib';


export class FieldFormControl extends React.Component{

  constructor(props){
    super(props);
    this.props.meta.error = false;
  }




  render () {

    const { placeholder, type, input, meta } = this.props;
    return (

      <FormGroup controlId={input.name} validationState={meta.error ? 'error' : null} >
        <Col sm={2}>
          <ControlLabel>{this.props.children}</ControlLabel>
        </Col>
        <Col sm={4}>
          <FormControl type={type} placeholder={placeholder} value={input.value}  onChange={input.onChange} />
          <FormControl.Feedback />
          <ErrorFunc error={meta.error} errorText={meta.error}/>
        </Col>
      </FormGroup>
    );
  }
};

export class ErrorFunc extends React.Component{
  constructor(props)
  {
    super(props);
  }

  render()
  {

    if( this.props.error ){
      console.log('error');
        return (<HelpBlock>{this.props.errorText}</HelpBlock>);
      }

      return <div></div>

  }
}

export class FieldFormControlTextArea extends React.Component{

  constructor(props){
    super(props);
    this.props.meta.error = false;
  }

  render () {

    const { placeholder, type, input, meta } = this.props;
    return (

      <FormGroup controlId={input.name} validationState={meta.error ? 'error' : null} >
        <Col sm={2}>
          <ControlLabel>{this.props.children}</ControlLabel>
        </Col>
        <Col sm={8}>
          <FormControl rows={6} componentClass="textarea" type={type} placeholder={placeholder} value={input.value} onChange={input.onChange} />
          <FormControl.Feedback />
          <ErrorFunc error={meta.error} errorText={meta.error}/>
        </Col>
      </FormGroup>
    );
  }
};



export class FieldFormControlSelect extends React.Component{

    constructor(props){
    super(props);
    this.props.meta.error = false;
  }

  render () {

    const { placeholder, type, input, meta, options} = this.props;

    const optionsList = options.map(
    (option, index)=>(
      <option value={option} key={index}>{option}</option>
    )
  );

    console.log("meta\n");
    console.dir(meta);

    return (
      <FormGroup controlId={input.name} validationState={meta.error ? 'error' : null}>
        <Col sm={2}>
          <ControlLabel>{this.props.children}</ControlLabel>
        </Col>
        <Col sm={4}>
          <FormControl componentClass="select" placeholder={placeholder} value={input.value}  onChange={input.onChange} >
            {optionsList}
          </FormControl>
          <FormControl.Feedback />
          <ErrorFunc error={meta.error} errorText={meta.error}/>
        </Col>
      </FormGroup>
    );
  }

}