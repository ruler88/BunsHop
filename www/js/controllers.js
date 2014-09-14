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

	.controller('GoogleAuthController', function($scope, AuthService) {

		$scope.login = function() {
			AuthService.login();
		}

	})
;

