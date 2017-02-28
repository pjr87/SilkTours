
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