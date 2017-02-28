

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
		
		
