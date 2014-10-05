var gcm = require('node-gcm');
var message = new gcm.Message();
var sender = new gcm.Sender('AIzaSyBSbZfBTrAH4xXdnk_1iVLRclNTWiUcWmY');
var registrationIds = [];

registrationIds.push('APA91bF__pSyj9ORTIHxiBmpBZJKE0cwM3shyVCOxBjNSlZ6MSAre8taFgbLr_cNwLYQDHyoA5LD6leM1_a8XODKghqGCmLSbH_akejKg3eHvd4QLeETycJCHHxgegFqbZV-F4KfkoQARyZbBlzfh4ed0wDFdRlqX0b31g_CozE-Vpf1r_3K7C4');
registrationIds.push('APA91bF_MFbloS6uV9KlpZ5QL0R37fBjzaahaTmmBk8tEytOSWxNRYIJHBxXDTBHJHuGYtLdgYLO9mrqWNBaViA8sXb58MDf_9nh7SKyR54qP-Zr0XMf_VJj-o3GGrGBk7vjlj2HvoeDLOo1w3qNEYn4XMi2UdD3goUp0r3ltuVFn7p_4FMfrHc');


// Value the payload data to send...
message.addData('first_name', "Kai");
message.addData('latitude', "37.7");
message.addData('longitude', "-121");
message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.

///**
//* Parameters: message-literal, registrationIds-array, No. of retries, callback-function
//*/
//sender.send(message, registrationIds, 4, function (err, result) {
//	console.log(result);
//});
//
//
//var message2 = new gcm.Message();
//message2.addData('first_name', "Sarah");
//message2.addData('latitude', "37.9");
//message2.addData('longitude', "-121");
//message2.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
//
//sender.send(message2, registrationIds, 4, function (err, result) {
//	console.log(result);
//});
//
//var message3 = new gcm.Message();
//message3.addData('first_name', "Sarah");
//message3.addData('latitude', "37.8");
//message3.addData('longitude', "-121.2");
//message3.addData('metaData', "locationMarker");
//
//sender.send(message3, registrationIds, 4, function(err, result) {
//	console.log(result);
//});

var message4 = new gcm.Message();
message4.addData('first_name', "Sarah");
message4.addData('getLocation', 'getLocation');

sender.send(message4, registrationIds, 4, function(err, result) {
	console.log(result);
});
