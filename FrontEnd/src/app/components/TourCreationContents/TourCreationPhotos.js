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
    var photos = [];
    console.log('files: ', files);
    files.forEach((file)=> {
      console.log('file ', file);
      var newFile = {
        name: file.name,
        file: file
      }
      photos.push(newFile);
      console.log("newFile ", newFile);
    });
    this.props.dispatch(updatePhotoState(photos));
  }

  handleImageLoaded(state){
      this.setState({
          [state + 'Loaded']: true
      });
  }

  handleBeforeImageLoad(state){
      this.setState({
          [state + 'BeforeLoaded']: true
      });
  }

  handleClick(state){
      let node = this.refs[state];
      this.setState({
          [state]: node.crop()
      });
  }

  handleChange(state, values){
      console.log(state, values)
      this.setState({
          [state + 'Values']: values
      });
  }

  handleGetValues(state){
      let node = this.refs[state];
      this.setState({
          [state + 'Values']: node.values()
      });
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

        {this.props.photos.length > 0 ? <div>
        <h2>Uploading {this.props.photos.length} files...</h2>
        <div>{this.props.photos.map((file) =>
          <Cropper src={file.file.preview} ratio={9 / 9} width={100} ref="image"
                   onImgLoad={() => this.handleImageLoaded('image')}/>
        )}
        <br/>
        {this.state.imageLoaded ? <button onClick={() => this.handleClick('image')}>crop</button> : null}
        <h4>after crop</h4>
        {this.state.image ? <img src={this.state.image} alt=""/> : null}
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
  photos: React.PropTypes.array
}

function select (state) {
  return {
    photos: state.TourCreationReducer.photos
  };
}

export default connect(select)(TourCreationPhotos);
