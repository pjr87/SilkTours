import React from 'react';
import Modal from 'react-modal';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router';
import _ from "lodash";

// Importing css style and images
import style from '../../style/style.css';
import logoImg from '../../style/images/logo2.png';

// Importing componenets
import Header from '../header/Header';
import Footer from '../footer/Footer';

// modal style constructor
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// AvailableTours page in ES6
class AvailableToursPage extends React.Component{
  constructor (props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      open: false
    };
  }

  openModal () { this.setState({open: true}); }

  closeModal () { this.setState({open: false}); }

  render(){
  return (
    <div className= {style.exploreMain}>
      <Header fileName={logoImg}/>
      <div className={style.main}>
      <button onClick={this.openModal}>test</button>
      <Modal isOpen={this.state.open} style={customStyles}>
        <h4>philadelphia</h4>
        <br/>
        <br/>
        <h1>place: city hall</h1>
        <br/>
        <h1>address: 1401 John F. Kennedy Blvd, Philadelphia, PA 19107</h1>
        <br/>
        <h1>information:</h1>
        <br/>
        <h1>On John's trip, you will travel from... stopping at this place, this place, and this place</h1>
        <br/>
        <h1>addtional note:</h1>
        <br/>

        <button onClick={this.closeModal}>Close</button>
      </Modal>
      <h4>Tour:</h4>
      <h4>{this.props.location.query.location}</h4>
        <div className={style.searchMain}>
          <p className={style.searchMainFont}>search</p>
          <input></input>
          <p className={style.searchMainFont}>country</p>
          <select>
            <option>United States</option>
          </select>
          <p className={style.searchMainFont}>state</p>
          <select>
            <option>PA</option>
          </select>
          <p className={style.searchMainFont}>city</p>
          <select>
            <option>Philadelphia</option>
          </select>&nbsp;&nbsp;
          <button>Search</button>
         </div>
      </div>
      <br/>
        <AvailableToursLink location='cheesesteaks' locationName='cheesesteaks' styleName={style.exploreBox1}/>
        <AvailableToursLink location='cityhall' locationName='city hall' styleName={style.exploreBox2}/>
        <AvailableToursLink location='betsyrosshouse' locationName='betsy ross house' styleName={style.exploreBox3}/>
        <AvailableToursLink location='independencehall' locationName='independence hall' styleName={style.exploreBox4}/>
        <AvailableToursLink location='readingterminal' locationName='reading terminal' styleName={style.exploreBox1}/>
        <AvailableToursLink location='outlets' locationName='outlets' styleName={style.exploreBox2}/>
        {/*
        <Link
          to={{
            pathname: '/explore',
            query: { tour: 'cheesesteaks' }
          }}>
        <div className = {style.exploreBox1}>
          <h6>cheesesteaks</h6>
        </div>
        </Link>
        <Link
          to={{
            pathname: '/explore',
            query: { tour: 'cityhall' }
          }}>
        <div className = {style.exploreBox2}>
          <h6>city hall</h6>
        </div>
        </Link>
        <Link
          to={{
            pathname: '/explore',
            query: { tour: 'betsyrosshouse' }
          }}>
        <div className = {style.exploreBox3}>
          <h6>betsy ross house</h6>
        </div>
        </Link>
        <Link
          to={{
            pathname: '/explore',
            query: { tour: 'independencehall' }
          }}>
        <div className = {style.exploreBox4}>
          <h6>independence hall</h6>
        </div>
        </Link>
        <Link
          to={{
            pathname: '/explore',
            query: { tour: 'readingterminal' }
          }}>
        <div className = {style.exploreBox1}>
          <h6>reading terminal</h6>
        </div>
        </Link>
        <Link
          to={{
            pathname: '/explore',
            query: { tour: 'outlets' }
          }}>
        <div className = {style.exploreBox2}>
          <h6>outlets</h6>
        </div>
        </Link>
        */}
    <Footer/>
  </div>
  )
}
}

class AvailableToursLink extends React.Component{
  render(){
    return(
      <Link
        to={{
          pathname: '/explore',
          query: { tour: this.props.location }
        }}>
      <div className = {this.props.styleName}>
        <p className = {style.AvailableToursBoxBorder}>{this.props.locationName}</p>
      </div>
      </Link>
    );
  }
}

export default AvailableToursPage;
