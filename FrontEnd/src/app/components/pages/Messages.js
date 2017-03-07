import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router';

import style from '../../style/style.css';

var htmlContent = require('../Messages/sample/fullview.html');
import logoImg from '../../style/images/logo5.png';
import GetData from "../../databaseFunctions";
import InnerHTML from 'dangerously-set-inner-html';
import MessageBody from './MessageBody.js';

import { connect } from 'react-redux';


class Messages extends React.Component{



  constructor(props) {
  super(props);
  }



  render(){

        return (
          <div className= {style.Main}>
              <MessageBody />
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

    console.log("logins:   ");
    console.log(JSON.stringify(this.props.auth));

    function readMessage() {
      //console.log("testing12" + userId);
    }
    function onInitialize(response) {
      console.log('joejeeeeee');

      if (response === 'success') {
        var nameUser ="Test123";
        var temp = $("#mck-box-title")[0].innerHTML;
        $("#mck-box-title")[0].innerHTML = this.props.fullName + "'s " + temp;
            
      } else if (response === 'object' && response.status === 'error') {
        alert(response.errorMessage);
        console.log(response.errorMessage);
      }
      else
      {
        console.dir(response);
      }
    }

      console.log("logins:\n" + this.props.auth['Logins']);
      console.log("Identity:\n" + this.props.auth['IdentityId']);

      //Function to initialize plugin
      $applozic.fn
          .applozic({
            userId : this.props.auth['IdentityId'],
            userName : 'notJoe',
           // appId : 'live3e5c58454b51865daefc1d16ba47909d4',
           // appId: 'outlook3464d372342159e4b8c2adfb5f80fed2e',
            appId: '39dbafa82d712b9c4b91428bf91631707',
            ojq : $original,
            obsm : oModal,
            accessToken : JSON.stringify(this.props.auth['Logins']),//'000-Hello123-552',          //optional, leave it blank for testing purpose, read this if you want to add additional security by verifying password from your server https://www.applozic.com/docs/configuration.html#access-token-url
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
  }
}


// select chooses which props to pull from store
function select(state) {
  return {
    auth: state.AuthReducer.auth,
    fullName: state.AuthReducer.user.fullName
  };
}



export default connect(select)(Messages);
