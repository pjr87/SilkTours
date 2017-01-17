

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


//var $applozic = jQuery.noConflict(true);
		//Sample json contains display name and photoLink for userId
		var contacts = {
	
		};
		function readMessage() {
			//console.log(userId);
		}
		//Callback Function to return display name by userId
		/*  function displayName(userId) {
		      //Todo: replace this with users display name
		      var contact = contacts[userId];   // contacts sample given above
		      if (typeof contact !== 'undefined') {
		          return contact.displayName;
		      }
		  }*/
		//Callback Function to return contact image url by userId
		/*  function contactImageSrc(userId) {
		      var contact = contacts[userId]; // contacts sample given above
		      if (typeof contact !== 'undefined') {
		          return contact.imageLink;
		      }
		  }*/
		//callback function execute after plugin initialize.
		function onInitialize(response) {
			if (response === 'success') {
				//write your logic exectute after plugin initialize.
			} else if (response === 'object' && response.status === 'error') {
				alert(response.errorMessage);
			}
		}
		//jQuery.noConflict();
		$(document)
				.ready(
						function($) {
							//Function to initialize plugin

							$applozic.fn
									.applozic({
										userId : 'fakeID',
										userName : 'notJoe',
										appId : 'live3e5c58454b51865daefc1d16ba47909d4',
										ojq : $original,
										obsm : oModal,
										//autoTypeSearchEnabled : false,
										// messageBubbleAvator: true,
										notificationIconLink : "https://www.applozic.com/resources/images/applozic_icon.png",
										readConversation : readMessage, // readMessage function defined above
										onInit : onInitialize, //callback function execute on plugin initialize
										maxAttachmentSize : 25, //max attachment size in MB
										desktopNotification : true,
										locShare : true,
										topicBox : true,
										googleApiKey : "AIzaSyCwiXryIw6umq2UKzvji4sg0VfSgnUUnoU", // replace it with your Google API key
									// initAutoSuggestions : initAutoSuggestions //  function to enable auto suggestions
									});

							// var contactjson = {"contacts": [{"userId": "user1", "displayName": "Devashish", "imageLink": "https://www.applozic.com/resources/images/applozic_icon.png"}, {"userId": "user2", "displayName": "Adarsh", "imageLink": "https://www.applozic.com/resources/images/applozic_icon.png"}, {"userId": "user3", "displayName": "Shanki", "imageLink": "https://www.applozic.com/resources/images/applozic_icon.png"}]};
							// To load contact list use below function and pass contacts json in format shown above in variable 'contactjson'.
							// $applozic.fn.applozic('loadContacts', contactjson);
						});

