import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router';

import MessageBody from '../../components/MessageBody/MessageBody.js';

import { connect } from 'react-redux';


class MessagesPage extends React.Component{



  constructor(props) {
    super(props);
    this.state = {
      userIdPassed: this.props.location.query.guideUserId
    }

  }



  render(){

        return (
          <div>
              <MessageBody />
          </div>
        );
      }

  componentDidMount(props){
    var idPassed = this.state.userIdPassed;
    var name = this.props.firstName;

    function readMessage() {
    }

    function onInitialize(response) {
      if (response === 'success') {
        var nameUser ="Test123";
        var temp = $("#mck-box-title")[0].innerHTML;
        $("#mck-box-title")[0].innerHTML =  name + "'s " + temp;
        if( idPassed != null )
        {
          $applozic.fn.applozic('loadTab', idPassed);
        }

      } else if (response === 'object' && response.status === 'error') {
        alert(response.errorMessage);
        console.log(response.errorMessage);
      }
      else
      {
        console.dir(response);
      }
    }

      //console.log("logins:\n" + this.props.auth['Logins']);
     // console.log("Identity:\n" + this.props.auth['IdentityId']);

      //Function to initialize plugin
      $applozic.fn
          .applozic({
            appId: '99f097e1f3b4ebb13e008942be1ccf34',
            userId : this.props.user_id,
            userName : this.props.firstName,
            ojq : $original,
            obsm : oModal,
            accessToken : 'test',//'000-Hello123-552',          //optional, leave it blank for testing purpose, read this if you want to add additional security by verifying password from your server https://www.applozic.com/docs/configuration.html#access-token-url
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
    firstName: state.AuthReducer.user.first_name,
    user_id: state.AuthReducer.user.id_users
  };
}



export default connect(select)(MessagesPage);
