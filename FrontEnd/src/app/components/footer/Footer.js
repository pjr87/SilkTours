import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss, Redirect } from 'react-router';


// Importing css style
import style from '../../style/style.css';

// Footer page in ES6
const Footer = () => {
  return (
    <div className = {style.footerStyle}>
    <h4 className= {style.contactLinkFooter}><Link to='/contactus'>Contact us</Link></h4>
      <h4>&#169;silk tours inc.</h4>
    </div>
  );
};

export default Footer;
