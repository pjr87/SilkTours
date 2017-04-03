import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { WithContext as ReactTags } from 'react-tag-input';
import {EditableField, FormTitle, DoubleEditableField, FormButton} from '../Forms/Forms.js';
import { updateInterestState } from '../../actions/TourCreationActions';

import style from './style.css';

export default class TourInterests extends React.Component{
  constructor(){
    super();

    this._changeInterest = this._changeInterest.bind(this)
  }

  _changeInterest(interest) {
    this._emitTourChange({...this.props.tour, interests: interest});
  }

  _emitTourChange (newInterestState) {
    this.props.dispatch(updateInterestState(newInterestState))
  }

  deleteTag(i) {
    var interests = this.props.tour.interests;;
    interests.splice(i, 1);
    this._changeInterest(interests);
  }

  addTag(tag) {
    var interests = this.props.tour.interests;
    interests.push({
        id: interests.length+1,
        text: tag
    });
    this._changeInterest(interests);
  }

  render(){
    return (
      <div>
      <Grid>
        <Row>
            <Col xs={0} md={1} lg={1}>
            </Col>
          <Col xs={12} md={11} lg={11}>

            <ReactTags classNames={{
              tags: style.ReactTags__tags,
              tagInput: style.ReactTags__tagInput,
              tagInputField: style.ReactTags__tagInputField,
              selected: style.ReactTags__selected,
              tag: style.ReactTags__tag,
              remove: style.ReactTags__remove,
              suggestions: style.ReactTags__suggestions
            }}
              tags={this.props.tour.interests}
              handleDelete={this.deleteTag.bind(this)}
              handleAddition={this.addTag.bind(this)}/>
             <br />
           </Col>
         </Row>
     </Grid>
   </div>
   );
  }
}
