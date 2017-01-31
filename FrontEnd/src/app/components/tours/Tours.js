import React from 'react';
import Modal from 'react-modal';
import style from '../../style/style.css';

// modal style constructor
const customStyles = {
  content : {
    top                   : '43%',
    left                  : '40%',
    right                 : '40%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-40%, -40%)'
  }
};

class Tours extends React.Component{
  constructor (props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      open: false,
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
      styleIndex: this.props.styleIndex,
      styleName: ""
    };
  }
  openModal () { this.setState({open: true}); }

  closeModal () { this.setState({open: false}); }

  componentDidMount() {
    if ((this.state.styleIndex+1) % 4 === 0){
      this.setState({styleName: style.exploreBox4});
    }
    else if ((this.state.styleIndex+1) % 4 === 1){
      this.setState({styleName: style.exploreBox1});
    }
    else if ((this.state.styleIndex+1) % 4 === 2){
      this.setState({styleName: style.exploreBox2});
    }else {
      this.setState({styleName: style.exploreBox3});
    }
  }

  render(){
    return (
      <div className = {this.state.styleName}>
        <Modal isOpen={this.state.open} style={customStyles}>
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
          <br/>
          </div>
          <img src={this.state.profile_image} alt="image" width="10%" height="10%"/>
          <br/>
          <button onClick={this.closeModal}>Reserve Tour</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={this.closeModal}>Messeage Guide</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={this.closeModal}>Close</button>
        </Modal>
      <div onClick={this.openModal}>
        <p className = {style.exploreBoxBorder}>{this.state.name}</p>
      </div>
      </div>
    );
  }
};

export default Tours;
