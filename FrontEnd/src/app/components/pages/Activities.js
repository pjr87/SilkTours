import React from 'react';

// Importing css style and image
import style from '../../style/style.css';
import logoImg from '../../style/images/logo4.png';

// Importing componenets
import Header from '../header/Header';
import Footer from '../footer/Footer';

// Activities page in ES6
class Activities extends React.Component {
  render(){
  return (
    <div>
      <Header largeHeader={false} fileName={logoImg}/>
      <h2>Activities</h2>
      <Footer/>
    </div>
  )
}
}

export default Activities;
