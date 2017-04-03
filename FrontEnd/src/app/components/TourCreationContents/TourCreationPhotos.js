import React from 'react';
import style from './style.css';
import {EditableFieldClass} from '../Forms/Forms.js';
import { Pager } from 'react-bootstrap';
import { updatePhotoState, setTabKey } from '../../actions/TourCreationActions';
import Dropzone from 'react-dropzone';

class TourCreationPhotos extends React.Component{
  constructor() {
    super();

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  next(){
    this.props.dispatch(setTabKey("description"));
  }

  previous(){
    this.props.dispatch(setTabKey("time"));
  }

  onDrop(files) {
    var photos = this.props.photos;
    console.log('photos: ', photos);
    files.forEach((file)=> {
      console.log('Received file: ', file);
      var formData = new FormData(file);
      $.each(file, function(key, value)
      {
          console.log('key: ', key);
          console.log('value: ', value);
          formData.append(key, value);
      });
      console.log('formData: ', formData);
      //formData.append('photo',file);
      var newFile = {
        name: file.name,
        file: formData
      }
      photos.push(newFile);
      console.log("photos", photos);
    });
    this.props.dispatch(updatePhotoState(photos));
  }

  render(){
    return (
      <div>
        <br/>
        <p className={style.HeaderStyle}>Select some photos to upload with the tour!</p>
        <br/>
        <br/>
        <Dropzone onDrop={this.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        <br/>
        <br/>
        <Pager>
          <Pager.Item previous onSelect={this.previous}>&larr; Go Back</Pager.Item>
          <Pager.Item next onSelect={this.next}>Next &rarr;</Pager.Item>
        </Pager>
      </div>
    )
  }
}

export default TourCreationPhotos;
