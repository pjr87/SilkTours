import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router';


var htmlContent = require('../Messages/sample/fullview.html');


//import AuthStore from "../../stores/AuthStore.js";
//import GetData from "../../databaseFunctions";

import InnerHTML from 'dangerously-set-inner-html';



class MessageBody extends React.Component{

  constructor(props) {
  super(props);
  }



  render(){

        return (
          <div>
            <InnerHTML key="messagesUniqueKey" html={htmlContent} />
          </div>
        );
      }






}

export default MessageBody;
