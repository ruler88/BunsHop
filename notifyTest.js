var gcm = require('node-gcm');
var message = new gcm.Message();
var sender = new gcm.Sender('AIzaSyBSbZfBTrAH4xXdnk_1iVLRclNTWiUcWmY');
var registrationIds = [];

// Value the payload data to send...
message.addData('message', "Test A");
message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.

// At least one reg id required
registrationIds.push('APA91bF__pSyj9ORTIHxiBmpBZJKE0cwM3shyVCOxBjNSlZ6MSAre8taFgbLr_cNwLYQDHyoA5LD6leM1_a8XODKghqGCmLSbH_akejKg3eHvd4QLeETycJCHHxgegFqbZV-F4KfkoQARyZbBlzfh4ed0wDFdRlqX0b31g_CozE-Vpf1r_3K7C4');

/**
* Parameters: message-literal, registrationIds-array, No. of retries, callback-function
*/
sender.send(message, registrationIds, 4, function (err, result) {
	console.log(result);
});
