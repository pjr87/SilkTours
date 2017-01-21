import React from 'react';
import Modal from 'react-modal';
import MediaQuery from 'react-responsive';

// Importing style and images
import style from '../../style/style.css';
import logoImg from '../../style/images/logo3.png';
import Junho from '../../style/images/Junho.png';
import Matt from '../../style/images/Matt.png';
import Phil from '../../style/images/Phil.png';
import Troy from '../../style/images/Troy.png';
import Andrew from '../../style/images/Andrew.png';
import Harsh from '../../style/images/Harsh.png';
import Kendall from '../../style/images/Kendall.png';
import Yongqiang from '../../style/images/Yongqiang.png';
import Joe from '../../style/images/Joe.png';

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

// About page in ES6
class About extends React.Component{
  constructor (props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      open: false,
      name: "",
      email: "",
      posi: "",
      pho: ""
    };
  }

  openModal (_name, _email, _posi, _pho) { this.setState(
    {open: true, name: _name, email: _email, posi: _posi, pho: _pho
    }); }

  closeModal () { this.setState({open: false}); }

  render(){
    return (
    <div className= {style.exploreMain}>
      <Header largeHeader={false} fileName={logoImg}/>
        <div className={style.main}>
          <Modal isOpen={this.state.open} style={customStyles}>
            <div className={style.aboutMain}>
            <h4>introducing our team member</h4>
            <br/>
            <br/>
            <h1>Name: {this.state.name}</h1>
            <br/>
            <h1>Email: {this.state.email}</h1>
            <br/>
            <h1>Position: {this.state.posi}</h1>
            <img src={this.state.pho} alt="image" width="250" height="250"/>
            <br/>
            <button onClick={this.closeModal}>Close</button>
            </div>
          </Modal>
          <h4>mission statement</h4>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
        </div>
        <MediaQuery minDeviceWidth={1224}>
          <MediaQuery minWidth={700}>
            <AboutDiv click= {()=>this.openModal("Matt Esposito",
              "mattespo23@gmail.com","Co-founder", Matt)}
              firstName= "Matt" lastName= "Esposito" style={style.aboutBox1}/>
            <AboutDiv click= {()=>this.openModal("Phillip Ryan",
              "p.ryanc@gmail.com","Co-founder", Phil)}
              firstName= "Phillip" lastName= "Ryan" style={style.aboutBox2}/>
            <AboutDiv click= {()=>this.openModal("Kendal Stephens",
              "kendall13stephens@gmail.com","Designer/Photographer", Kendall)}
              firstName= "Kendall" lastName= "Stephens" style={style.aboutBox3}/>
            <AboutDiv click= {()=>this.openModal("Junho An",
              "JunhoAn0702@gmail.com","Programmer", Junho)}
              firstName= "Junho" lastName= "An" style={style.aboutBox2}/>
            <AboutDiv click= {()=>this.openModal("Andrew Shidel",
              "ahs59@drexel.edu","Programmer", Andrew)}
              firstName= "Andrew" lastName= "Shidel" style={style.aboutBox3}/>
            <AboutDiv click= {()=>this.openModal("Harsh Bhargava",
              "gizmoghost95@gmail.com","Programmer", Harsh)}
              firstName= "Harsh" lastName= "Bhargava" style={style.aboutBox1}/>
            <AboutDiv click= {()=>this.openModal("Joe Budd",
              "jfb74@drexel.edu","Programmer", Joe)}
              firstName= "Joe" lastName= "Budd" style={style.aboutBox3}/>
            <AboutDiv click= {()=>this.openModal("Troy Santry",
              "tps54@drexel.edu","Programmer", Troy)}
              firstName= "Troy" lastName= "Santry" style={style.aboutBox1}/>
            <AboutDiv click= {()=>this.openModal("Yongqiang Fan",
              "yf322@drexel.edu","Programmer", Yongqiang)}
              firstName= "Yongqiang" lastName= "Fan" style={style.aboutBox2}/>
          </MediaQuery>
          <MediaQuery maxWidth={700}>
            <AboutDiv click= {()=>this.openModal("Matt Esposito",
              "mattespo23@gmail.com","Co-founder", Matt)}
              firstName= "Matt" lastName= "Esposito" style={style.aboutBoxMobile1}/>
            <AboutDiv click= {()=>this.openModal("Phillip Ryan",
              "p.ryanc@gmail.com","Co-founder", Phil)}
              firstName= "Phillip" lastName= "Ryan" style={style.aboutBoxMobile2}/>
            <AboutDiv click= {()=>this.openModal("Kendal Stephens",
              "kendall13stephens@gmail.com","Designer/Photographer", Kendall)}
              firstName= "Kendall" lastName= "Stephens" style={style.aboutBoxMobile3}/>
            <AboutDiv click= {()=>this.openModal("Junho An",
              "JunhoAn0702@gmail.com","Programmer", Junho)}
              firstName= "Junho" lastName= "An" style={style.aboutBoxMobile2}/>
            <AboutDiv click= {()=>this.openModal("Andrew Shidel",
              "ahs59@drexel.edu","Programmer", Andrew)}
              firstName= "Andrew" lastName= "Shidel" style={style.aboutBoxMobile3}/>
            <AboutDiv click= {()=>this.openModal("Harsh Bhargava",
              "gizmoghost95@gmail.com","Programmer", Harsh)}
              firstName= "Harsh" lastName= "Bhargava" style={style.aboutBoxMobile1}/>
            <AboutDiv click= {()=>this.openModal("Joe Budd",
              "jfb74@drexel.edu","Programmer", Joe)}
              firstName= "Joe" lastName= "Budd" style={style.aboutBoxMobile3}/>
            <AboutDiv click= {()=>this.openModal("Troy Santry",
              "tps54@drexel.edu","Programmer", Troy)}
              firstName= "Troy" lastName= "Santry" style={style.aboutBoxMobile1}/>
            <AboutDiv click= {()=>this.openModal("Yongqiang Fan",
              "yf322@drexel.edu","Programmer", Yongqiang)}
              firstName= "Yongqiang" lastName= "Fan" style={style.aboutBoxMobile2}/>
          </MediaQuery>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={1224}>
          <AboutDiv click= {()=>this.openModal("Matt Esposito",
            "mattespo23@gmail.com","Co-founder", Matt)}
            firstName= "Matt" lastName= "Esposito" style={style.aboutBoxMobile1}/>
          <AboutDiv click= {()=>this.openModal("Phillip Ryan",
            "p.ryanc@gmail.com","Co-founder", Phil)}
            firstName= "Phillip" lastName= "Ryan" style={style.aboutBoxMobile2}/>
          <AboutDiv click= {()=>this.openModal("Kendal Stephens",
            "kendall13stephens@gmail.com","Designer/Photographer", Kendall)}
            firstName= "Kendall" lastName= "Stephens" style={style.aboutBoxMobile3}/>
          <AboutDiv click= {()=>this.openModal("Junho An",
            "JunhoAn0702@gmail.com","Programmer", Junho)}
            firstName= "Junho" lastName= "An" style={style.aboutBoxMobile2}/>
          <AboutDiv click= {()=>this.openModal("Andrew Shidel",
            "ahs59@drexel.edu","Programmer", Andrew)}
            firstName= "Andrew" lastName= "Shidel" style={style.aboutBoxMobile3}/>
          <AboutDiv click= {()=>this.openModal("Harsh Bhargava",
            "gizmoghost95@gmail.com","Programmer", Harsh)}
            firstName= "Harsh" lastName= "Bhargava" style={style.aboutBoxMobile1}/>
          <AboutDiv click= {()=>this.openModal("Joe Budd",
            "jfb74@drexel.edu","Programmer", Joe)}
            firstName= "Joe" lastName= "Budd" style={style.aboutBoxMobile3}/>
          <AboutDiv click= {()=>this.openModal("Troy Santry",
            "tps54@drexel.edu","Programmer", Troy)}
            firstName= "Troy" lastName= "Santry" style={style.aboutBoxMobile1}/>
          <AboutDiv click= {()=>this.openModal("Yongqiang Fan",
            "yf322@drexel.edu","Programmer", Yongqiang)}
            firstName= "Yongqiang" lastName= "Fan" style={style.aboutBoxMobile2}/>
        </MediaQuery>
        <Footer/>
      </div>
  )
}
}

class AboutDiv extends React.Component{
  render(){
    return(
      <div onClick={this.props.click} className = {this.props.style}>
        <p className = {style.aboutBoxBorder}>{this.props.firstName}<br/>
        {this.props.lastName}</p>
      </div>
    );
  }
}

export default About;
