import React from 'react';
import Modal from 'react-modal';
import style from '../../style/style.css';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import AuthStore from "../../stores/AuthStore.js";
import MediaQuery from 'react-responsive';

// modal style constructor
const customStyles = {
  content : {
    top                   : '43%',
    left                  : '40%',
    right                 : '40%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-40%, -40%)',
  }
};

const coords = {
  lat: 51.5258541,
  lng: -0.08040660000006028
};

class Tours extends React.Component{
  constructor (props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      open: false,
      showReserveTourButton: false,
      additional_accomadation: this.props.additional_accomadation,
      additional_food: this.props.additional_food,
      additional_transport: this.props.additional_transport,
      address_city: this.props.address_city,
      address_country: this.props.address_country,
      address_street: this.props.address_street,
      address_suffix: this.props.address_suffix,
      address_unit: this.props.address_unit,
      address_unit_number: this.props.address_unit_number,
      address_zip: this.props.address_zip,
      average_rating: this.props.average_rating,
      description: this.props.description,
      firstStart_date: this.props.firstStart_date,
      id_guide: this.props.id_guide,
      id_rating: this.props.id_rating,
      id_tour: this.props.id_tour,
      is_deleted: this.props.is_deleted,
      lastEnd_date: this.props.lastEnd_date,
      max_group_size: this.props.max_group_size,
      min_group_size: this.props.min_group_size,
      name: this.props.name,
      price: this.props.price,
      profile_image: this.props.profile_image,
      rating_count: this.props.rating_count,
      stops: this.props.stops,
      styleIndex: this.props.styleIndex,
      styleName: "",
      styleMobileName: ""
    };
  }
  openModal () { this.setState({open: true}); }

  closeModal () { this.setState({open: false}); }

  componentDidMount() {
    if(AuthStore.signedIn()){
      this.setState({showReserveTourButton: true});
    }
    else{
      this.setState({showReserveTourButton: false});
    }
    if ((this.state.styleIndex+1) % 4 === 0){
      this.setState({styleName: style.exploreBox4});
      this.setState({styleMobileName: style.exploreBoxMobile4});
    }
    else if ((this.state.styleIndex+1) % 4 === 1){
      this.setState({styleName: style.exploreBox1});
      this.setState({styleMobileName: style.exploreBoxMobile1});
    }
    else if ((this.state.styleIndex+1) % 4 === 2){
      this.setState({styleName: style.exploreBox2});
      this.setState({styleMobileName: style.exploreBoxMobile2});
    }else {
      this.setState({styleName: style.exploreBox3});
      this.setState({styleMobileName: style.exploreBoxMobile3});
    }
  }

  showRserveButton(){
    if(this.state.showReserveTourButton){
      return(
        <button onClick={this.closeModal}>Reserve Tour</button>
      )
    }
  }

  openTourModal(){
    return(
      <Modal isOpen={this.state.open} style={customStyles} contentLabel="Modal">
        <p className = {style.tourModalTitle}>{this.state.address_city}</p>
        <br/>
        <div className = {style.tourModalPriceBox}>
          <p className = {style.tourModalPrice}>${this.state.price}</p>
        </div>
        <div className = {style.tourModalNameBox}>
          <p className = {style.tourModalName}>{this.state.name}</p>
        </div>
        <br/>
        <br/>
        <p className = {style.tourModalInfoContents}>description: {this.state.description}</p>
        <br/>
        <div className={style.tourModalLeft}>
        <p className = {style.tourModalInfoContents}>address: {this.state.address_street}, {this.state.address_city}, {this.state.address_country}, {this.state.address_zip} </p>
        <br/>
        <p className = {style.tourModalInfoContents}>max group size: {this.state.max_group_size}</p>
        <p className = {style.tourModalInfoContents}>min group size: {this.state.min_group_size}</p>
        <br/>
        <p className = {style.tourModalInfoTitle}>addtional note:</p>
        <br/>
        <p className = {style.tourModalInfoContents}>accomadation: {this.state.additional_accomadation}</p>
        <p className = {style.tourModalInfoContents}>food: {this.state.additional_food}</p>
        <p className = {style.tourModalInfoContents}>transport: {this.state.additional_transport}</p>
        <p className = {style.tourModalInfoContents}>stops: {this.state.stops.map((stop, i) => {
                      return (<StopInfo name={stop.id_stop} key={i}/>); })}</p>
        <br/>
        </div>
        <div className={style.tourModalRight}>
        <Gmaps
          width={'95%'}
          height={'300px'}
          lat={coords.lat}
          lng={coords.lng}
          zoom={12}
          loadingMessage={'Be happy'}
          params={{v: '3.exp', key: 'AIzaSyA7hW-zSFPnfDssD8pXPbfS6ePP3j0xq98'}}
          onMapCreated={this.onMapCreated}>

        </Gmaps>
      </div>
        <img src={this.state.profile_image} alt="image" width="10%" height="10%"/>
        <br/>
        {this.showRserveButton()}
        <button onClick={this.closeModal}>Messeage Guide</button>
        <button onClick={this.closeModal}>Close</button>
      </Modal>
    )
  }
  onMapCreated(map) {
  map.setOptions({
    disableDefaultUI: true
  });
  }

  onDragEnd(e) {
  console.log('onDragEnd', e);
  }

  onCloseClick() {
  console.log('onCloseClick');
  }

onClick(e) {
  console.log('onClick', e);
  }

  render(){
    return (
    <div className= {style.exploreBoxInline}>
      <MediaQuery minDeviceWidth={1224} minWidth={700}>
        <div className = {this.state.styleName}>
          {this.openTourModal()}
          <div onClick={this.openModal}>
            <p className = {style.exploreBoxBorder}>{this.state.name}</p>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery minDeviceWidth={1224} maxWidth={700}>
        <div className = {this.state.styleMobileName}>
          {this.openTourModal()}
          <div onClick={this.openModal}>
            <p className = {style.exploreBoxBorder}>{this.state.name}</p>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={1224}>
        <div className = {this.state.styleMobileName}>
          {this.openTourModal()}
          <div onClick={this.openModal}>
            <p className = {style.exploreBoxBorder}>{this.state.name}</p>
          </div>
        </div>
      </MediaQuery>
    </div>
    );
  }
};

class StopInfo extends React.Component {
    render() {
        return(
            <li>{this.props.name}</li>
            );
    }
}

export default Tours;
