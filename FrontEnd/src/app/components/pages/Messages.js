import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router';

import style from '../../style/style.css';

import * as service from '../../ajaxServices/AjaxList';


var htmlContent = require('../Messages/sample/fullview.html'); 


import logoImg from '../../style/images/logo5.png';

import { loadState, saveState } from '../../helpers/localStorageWrapper.js';

import AuthStore from "../../stores/AuthStore.js";
import GetData from "../../databaseFunctions";

import InnerHTML from 'dangerously-set-inner-html';

var newLines = "<br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> ";

import MessageBody from './MessageBody.js';

//import js from '../Messages/newJS.js';

class Messages extends React.Component{

  

  constructor(props) {
  super(props);
  }

  

  render(){

        function onButtonPress() {
            $applozic.fn.applozic('loadTab', 'meow');
        };

        var indents = [];
        for (var i = 0; i < 12; i++) {
          indents.push(<span key={i}>{""}<br/></span>);
        }



        return (
          <div className= {style.Main}>
            <Header fileName={logoImg}/>

              <MessageBody />



              
            {/*
              <button
                onClick={onButtonPress}
                title = 'Press to start Chat'
                color='#841584'>

                Press to Start Chat
              </button>*/}
          </div>
        );
      }

  componentDidMount(props){

    function startConversation( username )
        {
          window.onload = function () {
            console.log("window loaded");
            $applozic.fn.applozic('loadTab', username);
         }
        }
        

        
        function passUsername(){
          if( loadState() != null ){
            startConversation(loadState());
            console.log("doneeeeee  |" + loadState() +"|");
            saveState(null);
          }
          else
          {
            console.log("no username");
          }
        }



    
    var oModal = "";
if (typeof $original !== 'undefined') {
  $ = $original;
  jQuery = $original;
  if (typeof $.fn.modal === 'function') {
    oModal = $.fn.modal.noConflict();
  }
} else {
  $ = $applozic;
  jQuery = $applozic;
  if (typeof $applozic.fn.modal === 'function') {
    oModal = $applozic.fn.modal.noConflict();
  }
}

    var Logins;
    var profile=  AuthStore.getProfile();
    Logins = profile.Logins;

    console.log("logins:   ");
    console.log(JSON.stringify(Logins));
    console.log("");
    console.dir(Logins);

    function readMessage() {
      //console.log("testing12" + userId);
    }
    function onInitialize(response) {
      if (response === 'success') {
        var nameUser ="Test123";

      if(AuthStore.signedIn()){
          




          service.getUser(profile["id_user"]).then((function(response){
            var temp = $("#mck-box-title")[0].innerHTML;
            $("#mck-box-title")[0].innerHTML = response["data"]["first_name"] + " " + response["data"]["last_name"][0] + "'s " + temp;
          }));    
          }
            
      } else if (response === 'object' && response.status === 'error') {
        alert(response.errorMessage);
      }
      else
      {
        console.dir(response);
      }
    }


        $(document)
        .ready(
            function() {
              //Function to initialize plugin
              $applozic.fn
                  .applozic({
                    userId : 'fakeID',
                    userName : 'notJoe',
                   // appId : 'live3e5c58454b51865daefc1d16ba47909d4',
                   // appId: 'outlook3464d372342159e4b8c2adfb5f80fed2e',
                    appId: '39dbafa82d712b9c4b91428bf91631707',
                    ojq : $original,
                    obsm : oModal,
                    accessToken : JSON.stringify(Logins),//'000-Hello123-552',          //optional, leave it blank for testing purpose, read this if you want to add additional security by verifying password from your server https://www.applozic.com/docs/configuration.html#access-token-url
                    authenticationTypeId: 0,    //1 for password verification from Applozic server and 0 for access Token verification from your server
                    autoTypeSearchEnabled : false,
                    loadOwnContacts : false,
                    //  messageBubbleAvator: true,
                    notificationIconLink : "https://www.applozic.com/resources/images/applozic_icon.png",
                    readConversation : readMessage, // readMessage function defined above
                    onInit : onInitialize, //callback function execute on plugin initialize
                    maxAttachmentSize : 25, //max attachment size in MB
                    desktopNotification : true,
                    locShare : false,
                    topicBox : true,
                    googleApiKey : "AIzaSyCwiXryIw6umq2UKzvji4sg0VfSgnUUnoU" // replace it with your Google API key
                  });
            });

                      {passUsername()}
                      {window.scrollTo(0, 0)}

  }

    }

 
  

export default Messages;
