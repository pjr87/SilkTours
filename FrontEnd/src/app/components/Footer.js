import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router';
import style from './style/style.css';

const Footer = () => {
  return (
    <div className = {style.footerStyle}>
      <h4>&#169;silk tours inc.</h4>
    </div>
  );
};

export default Footer;
 
