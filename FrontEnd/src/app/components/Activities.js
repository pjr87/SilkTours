import React from 'react';
import Header from './Header';
import Footer from './Footer';
import style from './style/style.css';

class Activities extends React.Component {
  render(){
  return (
    <div>
      <Header largeHeader={false} />
      <h2>Activities</h2>
      <Footer/>
    </div>
  )
}
}

export default Activities;
