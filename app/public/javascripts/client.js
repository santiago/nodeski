var websocket;

function truncate(el, len) {
    len = len || 200;
    if (el) {
	var trunc = el.innerHTML;
	if (trunc.length > len) {

	    /* Truncate the content of the P, then go back to the end of the
	       previous word to ensure that we don't truncate in the middle of
	       a word */
	    trunc = trunc.substring(0, len);
	    // trunc = trunc.replace(/\w+$/, '');
	    
	    /* Add an ellipses to the end and make it a link that expands
	       the paragraph back to its original size */
	    trunc += '...';
	    el.innerHTML = trunc;
	}
    }
}

jQuery(document).ready(function($) {
    websocket = new io.Socket(null, {port: 80});
    websocket.connect();

    websocket.on('message', function(msg) {
    });
    
    window.fbAsyncInit = function() {
	FB.init({appId: 'XXXXXXXXXXXX', status: true, cookie: true, xfbml: true});
    };

    (function() {
	var e = document.createElement('script');
	e.type = 'text/javascript';
	e.src = document.location.protocol +
	    '//connect.facebook.net/es_LA/all.js';
	e.async = true;
	document.getElementById('fb-root').appendChild(e);
    }());
});