var xmpp = require('node-xmpp-client');

var options = {
	type: 'client',
	jid: '420168715514@gcm.googleapis.com',
	password: 'AIzaSyBSbZfBTrAH4xXdnk_1iVLRclNTWiUcWmY',
	port: 5235,
	host: 'gcm.googleapis.com',
	legacySSL: true,
	preferredSaslMechanism : 'PLAIN'
};

console.log("Creating XMPP Application");

var cl = new xmpp.Client(options);

cl.on('online', function()
{
	console.log("XMPP Online");
});

cl.on('error',
function(e) {
	console.log("Error occured:");
	console.error(e);
	console.error(e.children);
});

client.on('stanza', function(stanza) {
	console.log('Incoming stanza: ', stanza.toString())
});
