import React from 'react';
import Header from './Header';
import Footer from './Footer';

const AvailableToursPage = ( { location } ) => {
  return (
    <div>
      <Header/>
      <h2>{location.query.location}</h2>
      <h2>AvailableTours</h2>
      <Footer/>
    </div>
  )
}

export default AvailableToursPage;
