import React from 'react';
import style from './style.css';
import {EditableFieldClass} from '../Forms/Forms.js';
import { Pager } from 'react-bootstrap';
import { updatePhotoState, setTabKey } from '../../actions/TourCreationActions';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import ReactCrop from 'react-image-crop';


class TourCreationPhotos extends React.Component{
  constructor() {
    super();

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onOpenClick = this.onOpenClick.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleClick = this.handleClick.bind(this)

    this.state = {
        image: '',
        imageLoaded: false,
        crop:{
          aspect: 9/9
        },
        pixelCrop: {},
        cropped: false,
        height: 0,
        width: 0
    }
  }

  onChange(crop, pixelCrop) {
    this.setState({crop: crop, pixelCrop: pixelCrop, imageLoaded: true});
    console.log("crop: ", this.state.crop);
    console.log("pixelCrop: ", this.state.pixelCrop);
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

    console.log(files);

    const audio = document.createElement('img');
    audio.src = files[0].preview;
    audio.onload = function()
    {
      this.setState({height: audio.naturalHeight, width: audio.naturalWidth});
      audio.parentNode.removeChild(audio);
    }.bind(this);

    this.props.dispatch(updatePhotoState(photos));
  }

  handleImageLoaded(state){
      this.setState({
          [state + 'Loaded']: true
      });
  }

  handleClick(state){
    var photos = {};
    console.log("hello");

    console.log("crop: ", this.state.crop);
    console.log("pixelCrop: ", this.state.pixelCrop);

    var img = document.querySelector('#left-tabs-example-pane-photos > div > div:nth-child(7) > div > div > div > img');


    var imageWidth = this.state.width;
    var imageHeight = this.state.height;

    console.log("height width", this.imageHeight, " ", this.imageWidth);

    var cropX = (this.state.crop.x / 100.0) * imageWidth;
    var cropY = (this.state.crop.y / 100.0) * imageHeight;

    var cropWidth = (this.state.crop.width / 100.0) * imageWidth;
    var cropHeight = (this.state.crop.height / 100.0) * imageHeight;

    var canvas = document.createElement('canvas');
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    var ctx = canvas.getContext('2d');

    ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

    if (HTMLCanvasElement.prototype.toBlob) {
      console.info('It looks like Chrome now supports HTMLCanvasElement.toBlob.. time to uncomment some code!');
    }

    // canvas.toBlob will be faster and non-blocking but is currently only supported in FF.
    // canvas.toBlob(function(blob) {
    //  var url = URL.createObjectURL(blob);

    //  imgDest.onload = function() {
    //    URL.revokeObjectURL(url);
    //    this.ready();
    //  };

    //  imgDest.src = url;
    // });

    console.log("base64: ", canvas.toDataURL('image/jpeg'));

    var crop = this.state.crop;

    crop.width = 100;
    crop.height = 100;

    this.setState({
      crop: crop,
      cropped: true
    });

    console.log("newState: ", this.state.crop);


    var newFile = {
      name: this.props.photos.name,
      file: canvas.toDataURL('image/jpeg')
    }
    photos = newFile;
    this.props.dispatch(updatePhotoState(photos));


  }

  render(){
    if(this.state.cropped == false){
      return (
        <div>
          <br/>
          <p className={style.HeaderStyle}>Select some photos to upload with the tour!</p>
          <br/>
          <br/>
          <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
          </Dropzone>
          <button type="button" onClick={this.onOpenClick}>
              Open Dropzone
          </button>

          {this.props.photos ? <div>
          <div>
            <ReactCrop src={this.props.photos.file}
                      {...this.state} keepSelection = {true}
                       onChange={(crop, pixelCrop) => this.onChange(crop, pixelCrop)}


                       />
          <br/>
          {this.state.imageLoaded ? <button onClick={() => this.handleClick('image')}>crop</button> : null }
          </div>
          </div> : null}

          <br/>
          <br/>
          <Pager>
            <Pager.Item previous onSelect={this.previous}>&larr; Go Back</Pager.Item>
            <Pager.Item disabled next onSelect={this.next}>Next &rarr;</Pager.Item>
          </Pager>
        </div>
      )
    }
    else{
      return (
        <div>
          <br/>
          <p className={style.HeaderStyle}>Select some photos to upload with the tour!</p>
          <br/>
          <br/>
          <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
          </Dropzone>
          <button type="button" onClick={this.onOpenClick}>
              Open Dropzone
          </button>

          {this.props.photos ? <div>
          <div>
            <ReactCrop src={this.props.photos.file}
                      {...this.state} keepSelection = {true}
                       onChange={(crop, pixelCrop) => this.onChange(crop, pixelCrop)}


                       />
          <br/>
          {this.state.imageLoaded ? <button onClick={() => this.handleClick('image')}>crop</button> : null }
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
