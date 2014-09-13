angular.module('map.controllers', [])

	.controller('MapController', function ($scope, $ionicLoading, MapService) {

		$scope.mapCreated = function (map) {
			$scope.map = map;
		};

		$scope.centerOnMe = function () {
			MapService.centerOnMe($scope, $ionicLoading);
		};

		$scope.watchMe = function() {
			MapService.watchMe($scope);
		};

		$scope.stopWatch = function() {
			MapService.stopWatch();
		}
	})

	.controller('MenuController', function($scope, $ionicSideMenuDelegate) {
		//disable left drag to open menu
		$ionicSideMenuDelegate.canDragContent(false);
	})

	.controller('GCMController', function($scope) {
		$scope.notificationRegister = function() {
			console.log("OH NOES");

			successHandler = function(result) {
				alert('Callback Success! Result = '+result);
			};

			errorHandler = function(error) {
				//alert(error);
			};

			var pushNotification = window.plugins.pushNotification;
			pushNotification.register(successHandler, errorHandler,{"senderID":"errorHandler","ecb":"app.onNotificationGCM"});
		}
	})

	.controller('GoogleAuthController', function($scope) {

		$scope.login = function() {
			var clientId = '420168715514-4jcusmc7mftekt5uhtv8vr5nl3s1cc44.apps.googleusercontent.com';
			var apiKey = 'AIzaSyBXnO6zhNaEekfuJz4tbICKYDuZ3yJmNEs';
			var scopes = 'https://www.googleapis.com/auth/userinfo.email';

			function auth() {
				var config = {
					'client_id': clientId,
					'scope': scopes
				};
				gapi.auth.authorize(config, function() {
					var access_token = gapi.auth.getToken().access_token;
					assignUser(access_token);
				});
			}

			auth();

			function assignUser(access_token) {
				console.log(access_token);
				$.ajax({
					url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + access_token,
					data: null,
					success: function(resp) {
						user    =   resp;
						console.log(user);
					},
					dataType: "jsonp"
				});
				console.log('complete login, welcome ');
			}
		}

	})
;

