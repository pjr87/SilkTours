import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { WithContext as ReactTags } from 'react-tag-input';
import {EditableField, FormTitle, DoubleEditableField, FormButton} from '../Forms/Forms.js';

import style from './style.css';

export default class Interests extends React.Component{


  deleteTag(i) {
        //var user = this.state.user;
        //user.interests.splice(i, 1);
        //this.setState({user:user});
        console.log("t");
    }

    addTag(tag) {
        //this.props.tagAddition(tag)
        console.log("t");
    }

  render(){
    return (
      <div>
        <FormTitle title={this.props.title} />
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
              tags={this.props.interests}
              handleDelete={this.props.onTagDelete.bind(this)}
              handleAddition={this.props.onTagAdd.bind(this)}/>
             <br />
           </Col>
         </Row>
     </Grid>
   </div>
   );
  }
}
