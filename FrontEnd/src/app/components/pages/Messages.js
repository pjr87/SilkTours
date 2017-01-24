import React from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import style from '../../style/style.css';

var htmlContent = require('../Messages/sample/fullview.html'); 

import js from '../Messages/newJS.js';
import logoImg from '../../style/images/logo5.png';

import { loadState, saveState } from '../../helpers/localStorageWrapper.js';



class Messages extends React.Component{
  render(){



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

        function onButtonPress() {
            //$applozic.fn.applozic('loadTab', 'meow');
        };

        return (
          <div>
            <Header fileName={logoImg}/>


              <div dangerouslySetInnerHTML={ {__html: htmlContent} } />
              {passUsername()}
              <button
                onClick={onButtonPress}
                title = 'Press to start Chat'
                color='#841584'>

                Press to Start Chat
              </button>

            <Footer/>
          </div>
        );
      }

 
  componentWillMount() {
 {
    var newScript = document.createElement("script");
    newScript.src = "./js/init.js";

    document.body.appendChild(newScript);

    var initCode = "function readMessage() {\n\t\t\t\/\/console.log(userId);\n\t\t}\n\t\tfunction onInitialize(response) {\n\t\t\tif (response === \'success\') {\n\t\t\t\t\/\/write your logic exectute after plugin initialize.\n\t\t\t} else if (response === \'object\' && response.status === \'error\') {\n\t\t\t\talert(response.errorMessage);\n\t\t\t}\n\t\t}\n\n\t\t\t\t$(document)\n\t\t\t\t.ready(\n\t\t\t\t\t\tfunction() {\n\t\t\t\t\t\t\t\/\/Function to initialize plugin\n\t\t\t\t\t\t\t$applozic.fn\n\t\t\t\t\t\t\t\t\t.applozic({\n\t\t\t\t\t\t\t\t        userId : \'fakeID\',\n\t\t\t\t\t\t\t\t\t\tuserName : \'notJoe\',\n\t\t\t\t\t\t\t\t\t\tappId : \'live3e5c58454b51865daefc1d16ba47909d4\',\n\t\t\t\t\t\t\t\t\t\tojq : $original,\n\t\t\t\t\t\t\t\t\t\tobsm : oModal,\n\t\t\t\t\t\t\t\t\t\taccessToken :\'\',          \/\/optional, leave it blank for testing purpose, read this if you want to add additional security by verifying password from your server https:\/\/www.applozic.com\/docs\/configuration.html#access-token-url\n\t\t\t\t\t\t\t\t\t\t\/\/  authenticationTypeId: 1,    \/\/1 for password verification from Applozic server and 0 for access Token verification from your server\n\t\t\t\t\t\t\t\t\t\tautoTypeSearchEnabled : false,\n\t\t\t\t\t\t\t\t\t\tloadOwnContacts : false,\n\t\t\t\t\t\t\t\t\t\t\/\/  messageBubbleAvator: true,\n\t\t\t\t\t\t\t\t\t\tnotificationIconLink : \"https:\/\/www.applozic.com\/resources\/images\/applozic_icon.png\",\n\t\t\t\t\t\t\t\t\t\treadConversation : readMessage, \/\/ readMessage function defined above\n\t\t\t\t\t\t\t\t\t\tonInit : onInitialize, \/\/callback function execute on plugin initialize\n\t\t\t\t\t\t\t\t\t\tmaxAttachmentSize : 25, \/\/max attachment size in MB\n\t\t\t\t\t\t\t\t\t\tdesktopNotification : true,\n\t\t\t\t\t\t\t\t\t\tlocShare : false,\n\t\t\t\t\t\t\t\t\t\ttopicBox : true,\n\t\t\t\t\t\t\t\t\t\tgoogleApiKey : \"AIzaSyCwiXryIw6umq2UKzvji4sg0VfSgnUUnoU\" \/\/ replace it with your Google API key\n\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t});";
    
    var newScript2 = document.createElement("script");
    newScript2.innerHTML = initCode;

    document.body.appendChild(newScript2);

  }
  }
  

}

export default Messages;
