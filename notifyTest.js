var gcm = require('node-gcm');
var message = new gcm.Message();
var sender = new gcm.Sender('AIzaSyBSbZfBTrAH4xXdnk_1iVLRclNTWiUcWmY');
var registrationIds = [];

// Value the payload data to send...
message.addData('first_name', "Sarah");
message.addData('latitude', "37");
message.addData('longitude', "-122");
message.addData('metaData', "locationMarker");

/*
 first_name: $rootScope.first_name,
 latitude: position.k,
 longitude: position.B,
 metaData: 'locationMarker'}
 */
message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.

// At least one reg id required
registrationIds.push('APA91bF__pSyj9ORTIHxiBmpBZJKE0cwM3shyVCOxBjNSlZ6MSAre8taFgbLr_cNwLYQDHyoA5LD6leM1_a8XODKghqGCmLSbH_akejKg3eHvd4QLeETycJCHHxgegFqbZV-F4KfkoQARyZbBlzfh4ed0wDFdRlqX0b31g_CozE-Vpf1r_3K7C4');
registrationIds.push('APA91bHCSM1tVQ5C9DsApCboYLwXMqUd7ybPGPlsa6E6zGDw9ss0HN7ozAO9_XG05-CEx5pHBYa9XDntYdSOJw3FtXGZmXu_ogSRIVYcKU4T9nRztsq8y-159q8Aad-y9wbOEKoa81kO9vpHQebylLF4TzqeplUXsKWvmAfXJE22ap0xGW8TfQY');

/**
* Parameters: message-literal, registrationIds-array, No. of retries, callback-function
*/
sender.send(message, registrationIds, 4, function (err, result) {
	console.log(result);
});
