import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router';

import style from '../../style/style.css';

import * as service from '../../ajaxServices/AjaxList';
import logoImg from '../../style/images/logo5.png';
import { loadState, saveState } from '../../helpers/localStorageWrapper.js';
//import AuthStore from "../../stores/AuthStore.js";
import ReactList from 'react-list';


//import js from '../Messages/newJS.js';

class ChatView extends React.Component{



  constructor(props) {
  super(props);
  this.state = {
    messages: [],
    selected: "Default"
  }

  }

  componentWillMount() {

    var msg = ['hello', 'what is up?', 'how are you?', 'I am great'];
    for( var i=0; i < msg.length; i++ )
    {
      this.state.messages[i] = msg[i];
    }


  }

  handleAccounts(accounts) {
    this.setState({accounts});
  }

  renderItemChat(index, key){
    return (
      <div key={key}>{this.state.messages[index]}</div> );
  }

  render(){
      console.log("rendered chatView");

        return (

                <div className = {style.messageBody} style={{overflow: 'auto'}}>
                {this.props.name}
                  <ReactList
                    itemRenderer={::this.renderItemChat}
                    length={this.state.messages.length}
                    type='uniform'
                  />
                </div>
        );
      }

  componentDidMount(props){
      console.log("mounteddddd");

  }

    }




export default ChatView;
