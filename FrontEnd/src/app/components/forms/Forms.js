import React from 'react';
import style from '../../style/style.css';

class EditableField extends React.Component{

  onChangeHandler(e){
    this.props.update(e.target.value, this.props.name);
  }

  render(){
    return (<div className={style.formRow}>
        <div className={style.formLabel}> {this.props.label} </div>
          <div className={style.formField}>
            <div className={style.formInput}>

              <input type="text" onChange={this.onChangeHandler.bind(this)} name={this.props.name} value={this.props.value} maxLength="60" />
            </div>
          </div>
        </div>);
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
    return (<div className={style.formHeader}> {this.props.title} </div>);
  }
}

class FormButton extends React.Component{
  render(){
    return (
      <div className={style.formRow}>
        <button onClick={this.props.action} className={style.formButton} > Submit </button>
      </div>
    );
  }
}

export {EditableField, FormTitle, FormButton, DoubleEditableField};
