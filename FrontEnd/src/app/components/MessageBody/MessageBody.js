import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router';


var htmlContent = require('./Messages/sample/fullview.html');

import InnerHTML from 'dangerously-set-inner-html';
import style from './style.css';


class MessageBody extends React.Component{

  constructor(props) {
  super(props);
  }



  render(){

        return (
           <InnerHTML key="some_unique_key" html={htmlContent} />


        );
      }






}

export default MessageBody;
