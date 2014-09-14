function onDeviceReady() {

	var notificationRegister = function () {
		successHandler = function (result) {
			//alert('Callback Success! Result = ' + result);
		};
		errorHandler = function (error) {
			//alert(error);
		};

		var pushNotification = window.plugins.pushNotification;
		pushNotification.register(successHandler, errorHandler, {"senderID": "420168715514", "ecb": "onNotificationGCM"});
	};

	notificationRegister();
}

function onNotificationGCM(e) {
	switch (e.event) {
		case 'registered':
			if (e.regid.length > 0) {
				console.log("Regid " + e.regid);
			}
			break;

		case 'message':
			// this is the actual push notification. its format depends on the data model from the push server
			alert('message = ' + e.message + ' msgcnt = ' + e.msgcnt);
			break;

		case 'error':
			alert('GCM error = ' + e.msg);
			break;

		default:
			alert('An unknown GCM event has occurred');
			break;
	}
}

document.addEventListener('deviceready', onDeviceReady, true);
