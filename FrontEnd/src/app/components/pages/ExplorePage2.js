import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router';
import Modal from 'react-modal';
import MediaQuery from 'react-responsive';

// Importing css style and images
import style from '../../style/style.css';
import logoImg from '../../style/images/logo2.png';

// Importing componenets
import Header from '../header/Header';
import Footer from '../footer/Footer';
import AvailableToursPage from './AvailableToursPage';
import ToursList from '../tours/ToursList';
import TourContainer from '../../containers/tourContainer/TourContainer';

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

// Explore page in ES6. Link has a location parameter.
class ExplorePage2 extends React.Component{

  constructor(props) {
      super(props);
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.state = {
          postInfo: {
              tours:[]
          },
          tour: null
      }
  }

  openModal (_tour) { this.setState(
    {open: true
    });
    console.log(_tour);
  }

  closeModal () { this.setState({open: false}); }

  render(){
        const { tours } = this.state.postInfo;

        return (
          <div className= {style.exploreMain}>
              <Header fileName={logoImg}/>
                <Modal isOpen={this.state.open} style={customStyles}>
                  <div className={style.aboutMain}>
                  <button onClick={this.closeModal}>Close</button>
                  </div>
                </Modal>
                <h4>available tours</h4>
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
                  <button onClick= {()=>this.openModal()}>Search</button>
                 </div>
                 <br/>
                 <div onClick= {()=>this.openModal()}>
                <TourContainer/>
                </div>
                <Footer/>
          </div>

        );
      }
}

export default ExplorePage2;
