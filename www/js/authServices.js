
angular.module('auth.services', [])

	.service('AuthService', function() {

//		var objectToQueryString = function(obj) {
//			var str = [];
//			angular.forEach(obj, function(value, key) {
//				str.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
//			});
//			return str.join("&");
//		};
//
//		var setToken = function(data) {
//			//cache token in localStorage
//			localStorage.access_token = data.access_token;
//			localStorage.refresh_token = data.refresh_token || localStorage.refresh_token;
//			var expiresAt = new Date().getTime() + parseInt(data.expires_in, 10) * 1000 - 60000;
//			localStorage.expires_at = expiresAt;
//			console.log('set token complete');
//		};
//
//		//The recommendation is to use the redirect_uri "urn:ietf:wg:oauth:2.0:oob"
//		//which sets the authorization code in the browser's title. However, we can't
//		//access the title of the InAppBrowser.
//		//
//		//Instead, we pass a bogus redirect_uri of "http://localhost", which means the
//		//authorization code will get set in the url. We can access the url in the
//		//loadstart and loadstop events. So if we bind the loadstart event, we can
//		//find the authorization code and close the InAppBrowser after the user
//		//has granted us access to their data.
//		var googleCallback = function(e, $scope, $http){
//			var url = (typeof e.url !== 'undefined' ? e.url : e.originalEvent.url);
//			var code = /\?code=(.+)$/.exec(url);
//			var error = /\?error=(.+)$/.exec(url);
//
//			console.log("url event: " + e.url);
//			console.log("event type: " + e.type);
//
//			if (code || error) {
//				//Always close the browser when match is found
//				authWindow.close();
//			}
//
//			alert("url: " + url);
//			if (code) {
//				console.log("in code");
//				alert("code: " + code);
//				//Exchange the authorization code for an access token
//				$http({
//					method: "post",
//					url: "https://accounts.google.com/o/oauth2/token",
//					data: {
//						code: code[1],
//						client_id: options.client_id,
//						redirect_uri: options.redirect_uri,
//						client_secret: options.client_secret,
//						grant_type: 'authorization_code'
//					}
//
//				})
//					.then(function(response) {
//						console.log(response);
//					});
//
////				$.post('https://accounts.google.com/o/oauth2/token', {
////					code: code[1],
////					client_id: options.client_id,
////					redirect_uri: options.redirect_uri,
////					client_secret: options.client_secret,
////					grant_type: 'authorization_code'
////				}).done(function(data) {
////					setToken(data);
////					console.log("token: " + data);
////				}).fail(function(response) {
////					console.log("google oauth2 failed: " + response);
////				});
//			} else if (error) {
//				//The user denied access to the app
//				console.log("user denied access to the app");
//			}
//		};
//
//		var authorize = function(options, $scope, $http) {
//			//Build the OAuth consent page URL
//			var apiObj = {
//				client_id: options.client_id,
//				redirect_uri: options.redirect_uri,
//				response_type: 'code',
//				scope: options.scope
//			};
//
//			var authUrl = 'https://accounts.google.com/o/oauth2/auth?' + objectToQueryString(apiObj);
//
//			//Open the OAuth consent page in the InAppBrowser
//			var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no');
//			authWindow.addEventListener('loadstart',
//				function(event) {
//					googleCallback(event, $scope, $http);
//				});
//			console.log('back');
//		};		//end of authorize function
//
//
//		var userInfo = function(options) {
//			return $.getJSON('https://www.googleapis.com/oauth2/v1/userinfo', options);
//		};
//
//
//

		this.login = function($scope) {
			if (!window.cordova) {
				var appId = prompt("Enter FB Application ID", "");
				facebookConnectPlugin.browserInit(appId);
			}
			facebookConnectPlugin.login( ["email"],
				function (response) { alert("success: " + JSON.stringify(response)) },
				function (response) { alert("fail: " + JSON.stringify(response)) });
		};

	});

