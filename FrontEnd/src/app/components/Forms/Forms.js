import React from 'react';
import style from './style.css';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';


class EditableField extends React.Component{

  onChangeHandler(e){
    this.props.onChange(e);
  }

  render(){
    if(this.props.value == null){
      return (
        <FormGroup controlId={this.props.id}>
          <Col xs={12} md={2} lg={2}>
            <div />
          </Col>
          <Col xs={12} md={2} lg={2}>
            <ControlLabel> {this.props.label} </ControlLabel>
          </Col>
          <Col xs={12} md={6} lg={6}>
                <FormControl type="input" onChange={this.onChangeHandler.bind(this)} value='' />
          </Col>
          <Col xs={12} md={2} lg={2}>
            <div />
          </Col>
        </FormGroup>
      );
    }
    else{
      return (
        <FormGroup controlId={this.props.id}>
          <Col xs={12} md={2} lg={2}>
            <div />
          </Col>
          <Col xs={12} md={2} lg={2}>
            <ControlLabel> {this.props.label} </ControlLabel>
          </Col>
          <Col xs={12} md={6} lg={6}>
                <FormControl type="input" onChange={this.onChangeHandler.bind(this)} value={this.props.value} />
          </Col>
          <Col xs={12} md={2} lg={2}>
            <div />
          </Col>
        </FormGroup>
      );
    }
  }
}

class EditableFieldClass extends React.Component{

  onChangeHandler(e){
    this.props.onChange(e);
  }

  render(){
    if(this.props.value == null){
      return (
        <FormGroup controlId={this.props.id}>
          <Col xs={12} md={2} lg={2}>
            <div />
          </Col>
          <Col xs={12} md={2} lg={2}>
            <ControlLabel className={this.props.style}> {this.props.label} </ControlLabel>
          </Col>
          <Col xs={12} md={6} lg={6}>
                <FormControl type="input" onChange={this.onChangeHandler.bind(this)} value='' />
          </Col>
          <Col xs={12} md={2} lg={2}>
            <div />
          </Col>
        </FormGroup>
      );
    }
    else{
      return (
        <FormGroup controlId={this.props.id}>
          <Col xs={12} md={2} lg={2}>
            <div />
          </Col>
          <Col xs={12} md={2} lg={2}>
            <ControlLabel className={this.props.style}> {this.props.label} </ControlLabel>
          </Col>
          <Col xs={12} md={6} lg={6}>
                <FormControl type="input" onChange={this.onChangeHandler.bind(this)} value={this.props.value} />
          </Col>
          <Col xs={12} md={2} lg={2}>
            <div />
          </Col>
        </FormGroup>
      );
    }
  }
}

class StaticField extends React.Component{
  render(){
    if(this.props.value == null){
      return (
        <FormGroup controlId={this.props.id}>
          <Col xs={12} md={2} lg={2}>
            <div />
          </Col>
          <Col xs={12} md={2} lg={2}>
            <ControlLabel className={this.props.style}> {this.props.label} </ControlLabel>
          </Col>
          <Col xs={12} md={6} lg={6}>
                <FormControl type="input" value='' />
          </Col>
          <Col xs={12} md={2} lg={2}>
            <div />
          </Col>
        </FormGroup>
      );
    }
    else{
      return (
        <FormGroup controlId={this.props.id}>
          <Col xs={12} md={2} lg={2}>
            <div />
          </Col>
          <Col xs={12} md={2} lg={2}>
            <ControlLabel className={this.props.style}> {this.props.label} </ControlLabel>
          </Col>
          <Col xs={12} md={6} lg={6}>
                <FormControl type="input" value={this.props.value} />
          </Col>
          <Col xs={12} md={2} lg={2}>
            <div />
          </Col>
        </FormGroup>
      );
    }
  }
}


class DoubleEditableField extends React.Component{

  onChangeHandler1(e){
    this.props.update(e.target.value, this.props.name1);
  }
  onChangeHandler2(e){
    this.props.update(e.target.value, this.props.name2);
  }

  render(){
  return (
    <div className={style.formRow}>
      <div className={style.formFirstLabel}> Name </div>
      <div className={style.formField}>
        <div className={style.formInput}>
          <label> {this.props.label1}</label>
          <input onChange={this.onChangeHandler1.bind(this)} type="text" name={this.props.name1} value={this.props.value1} maxLength="60" />
        </div>
        <div className={style.formInput}>
          <label>{this.props.label2}</label>
          <input type="text" onChange={this.onChangeHandler2.bind(this)} name={this.props.name2} value={this.props.value2} maxLength="60" />
        </div>
    </div>
  </div>);
}
}

export default class Form extends React.Component{
  render(){
    return (<div className={style.formSection}> </div>);
  }
}

class FormTitle extends React.Component{
  render(){
    return (<div>
      <Col xs={0} md={2} lg={2}>

      </Col>
    <Col xs={12} md={10} lg={10}>
      <div className={style.formHeader}> {this.props.title} </div>
    </Col>
  </div>
    );
  }
}

class FormButton extends React.Component{
  render(){
    return (
      <div className={style.formRow}>
        <Col xs={12} md={2} lg={2}>

        </Col>
      <Col xs={12} md={10} lg={10}>
        <button onClick={this.props.action} className={style.formButton} > Submit </button>
      </Col>
      </div>
    );
  }
}

export {EditableField, EditableFieldClass, StaticField, FormTitle, FormButton, DoubleEditableField};
