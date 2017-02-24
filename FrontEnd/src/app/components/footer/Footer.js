import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss, Redirect } from 'react-router';


// Importing css style
import style from './style.css';

// Footer page in ES6
const Footer = () => {
  return (
    <div className = {style.footerStyle}>
    <h4 className= {style.contactLinkFooter}><Link to='/contactus'>Contact us</Link></h4>
      <p className = {style.Footer}>&#169;silk tours inc.</p>
    </div>
  );
};

export default Footer;
