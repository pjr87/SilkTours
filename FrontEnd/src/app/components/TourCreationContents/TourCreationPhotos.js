import React from 'react';
import style from './style.css';
import {EditableFieldClass} from '../Forms/Forms.js';
import { Pager } from 'react-bootstrap';
import { updatePhotoState, setTabKey } from '../../actions/TourCreationActions';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {Cropper} from 'react-image-cropper'

import logoImg5 from '../../style/images/logo5.png';

class TourCreationPhotos extends React.Component{
  constructor() {
    super();

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onOpenClick = this.onOpenClick.bind(this)

    this.state = {
        image: '',
        imageLoaded: false
    }
  }

  next(){
    this.props.dispatch(setTabKey("description"));
  }

  previous(){
    this.props.dispatch(setTabKey("time"));
  }

  onOpenClick () {
    this.dropzone.open();
  }

  onDrop(files) {
    var photos = {};
    files.forEach((file)=> {
      var newFile = {
        name: file.name,
        file: file.preview
      }
      photos = newFile;
    });
    this.props.dispatch(updatePhotoState(photos));
  }

  handleImageLoaded(state){
      this.setState({
          [state + 'Loaded']: true
      });
  }

  handleClick(state){
    var photos = {};
    let node = this.refs[state];
    this.setState({
      [state]: node.crop()
    });
    console.log("HERE", this.props.photos.name);
    var newFile = {
      name: this.props.photos.name,
      file: node.crop()
    }
    photos = newFile;
    this.props.dispatch(updatePhotoState(photos));
  }

  render(){
    return (
      <div>
        <br/>
        <p className={style.HeaderStyle}>Select some photos to upload with the tour!</p>
        <br/>
        <br/>
        <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
              <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        <button type="button" onClick={this.onOpenClick}>
            Open Dropzone
        </button>

        {this.props.photos ? <div>
        <h2>Uploading {this.props.photos.length} files...</h2>
        <div>
          <Cropper  src={this.props.photos.file} 
                    ratio={9 / 9} width={100} ref="image"
                    onImgLoad={() => this.handleImageLoaded('image')}/>
        <br/>
        {this.state.imageLoaded ? <button onClick={() => this.handleClick('image')}>crop</button> : null}
        <h4>after crop</h4>
        {this.state.image ? <img src={this.props.photos.file} alt=""/> : null}
        </div>
        </div> : null}

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

TourCreationPhotos.propTypes = {
  photos: React.PropTypes.object
}

function select (state) {
  return {
    photos: state.TourCreationReducer.photos
  };
}

export default connect(select)(TourCreationPhotos);
