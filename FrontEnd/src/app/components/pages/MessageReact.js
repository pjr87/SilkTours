import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router';
import style from './messageStyle.css';

import * as service from '../../ajaxServices/AjaxList';
import logoImg from '../../style/images/logo5.png';
import ReactList from 'react-list';

import ChatView from './ChatView';

import PageTitle from '../PageTitle/PageTitle.js'

//import js from '../Messages/newJS.js';

class MessageReact extends React.Component{

  

  constructor(props) {
  super(props);
  this.state = {
    accounts: [],
    selected: "Default"
  }

  this.handleClick = this.handleClick.bind(this);
  this.processMessages = this.processMessages.bind(this);
  }

  componentWillMount() {

    var names = [
          ['Abbott', 'http://i.imgur.com/ivIVJb.png'], 
          ['Acevedo', 'http://i.imgur.com/SZmu3b.png'], 
          ['Acosta', 'http://i.imgur.com/CNDZkb.png'],
          ['Arnold','http://i.imgur.com/znl28b.png'],
          ['Ashley','http://i.imgur.com/RV3uGb.png'],
          ['Atkins','http://i.imgur.com/UhvZmb.png'],
          ['Atkinson','http://i.imgur.com/ebMIKb.png'],
          ['Austin','http://i.imgur.com/Owuetb.png'],
          ['Avery','http://i.imgur.com/Ea62gb.png'],
          ['Avila','http://i.imgur.com/nvYWRb.png'],
          ['Ayala','http://i.imgur.com/GRBd1b.png'],
          ['Ayers','http://i.imgur.com/WTxUVb.png'],
          ['Bailey','http://i.imgur.com/mxubdb.png'],
          ['Baird','http://i.imgur.com/xMveIb.png'],
          ['Baker','http://i.imgur.com/oxANmb.png'],
          ['Baldwin','http://i.imgur.com/wglFAb.png'],
          ['Ball','http://i.imgur.com/PzHTEb.png']];

    this.setState({accounts: names});

    for( var i=0; i < names.length; i++ )
    {
      this.state.accounts[i] = names[i];
    }

    console.dir(this.state.accounts);
  }

  processMessages(messages){
    var tempM = [];
    for( var i=0; i < messages.length; i++ )
    {
      tempM.push(messages[i]);
    }

    console.log("tempM:\n" + tempM);
  }

  handleClick(event)
  {
    var messages = [];
    
    console.dir();

    service.getMessages().then(function(response){

      for( var i=0 ; i < response.data.message.length; i++ )
      {
        messages.push(response.data.message[i]);
      }
    });

    console.log( "msg:\n"); console.dir( messages );

        

    console.log("clicked " + event.target.innerText);
    this.setState({selected: event.target.innerText });
    console.log("state: " + event.target.innerText);
  
  }

  renderItem(index, key) {
    return ( 
      <div key={key} className={style.Conversation} onClick={ this.handleClick }>
        <img src={this.state.accounts[index][1]} className={style.contactImage} />
        <a key={key} className={style.contactInfo}>{this.state.accounts[index][0]}
        </a>
      </div> );
  }

  renderItemChat(index, key){
    return ( 
      <div key={key}>{this.state.messages[index]}</div> );
  }

  RenderName(props){

    return (
      <div>
        {props.selected}
      </div>)
  }
  

  render(){
        return (
            <div className= {style.MainBody}>
                <PageTitle title = "Conversations"/>
                <div className={style.mainMessage}>
                  <div className = {style.messageContacts} style={{overflow: 'auto'}}>
                      <ReactList
                        itemRenderer={::this.renderItem}
                        length={this.state.accounts.length}
                        type='uniform'
                      />
                  </div>

                  <ChatView name={this.state.selected} />

                </div>
            </div>
        );
      }

  componentDidMount(props){
      console.log("mounteddddd");

  }

    }

 
  

export default MessageReact;
