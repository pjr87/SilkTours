import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router';
import style from './style/style.css';
import logoImg from './style/images/logo.png';
import logoImg2 from './style/images/logo2.png';
import Header from './Header';
import Footer from './Footer';
import AvailableToursPage from './AvailableToursPage';

{/*var htmlContent = require('./Messages/sample/fullview.html'); 

import js from './newJS.js';
*/}

class Messages extends React.Component{
  render(){

        function onButtonPress() {
            //$applozic.fn.applozic('loadTab', 'meow');
        };

        return (
          <div>
            <Header/>
              <button
                onClick={onButtonPress}
                title = 'Press to start Chat'
                color='#841584'>

                Press to Start Chat
              </button>
        {/*
              <div dangerouslySetInnerHTML={ {__html: htmlContent} } />

            */}
            <Footer/>
          </div>
        );
      }

 
  componentWillMount() {
 {/*
    var newScript = document.createElement("script");
    newScript.src = "./js/init.js";

    document.body.appendChild(newScript);

    */}
  }
  

}

export default Messages;
