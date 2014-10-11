function onDeviceReady() {

	var notificationRegister = function () {
		successHandler = function (result) {
			console.log('Callback Success! Result = ' + result);
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
	console.log("notification message received: \n" + e);
	var zescope = angular.element(document.body).scope();

	switch (e.event) {
		case 'registered':
			if (e.regid.length > 0) {
				window.localStorage.setItem("regid", e.regid);
				console.log("Regid " + e.regid);
			}
			break;

		case 'message':
			// this is the actual push notification. its format depends on the data model from the push server
			// alert('message = ' + e.message + ' msgcnt = ' + e.msgcnt);
			// alert( JSON.stringify(e) );
			console.log( JSON.stringify(e) );

			if(e.payload) {
				console.log(JSON.stringify(e.payload));
				var message = e.payload;
				if(message.latitude && message.longitude && message.first_name) {
					zescope.updateMarkerLocation(message.latitude, message.longitude, message.first_name, message.metaData);
				}
				if(message.getLocation) {
					zescope.respondLocation();
				}
				if(message.backgroundAjaxGelocation) {
					zescope.backgroundAjaxGelocation();
				}
			}

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
