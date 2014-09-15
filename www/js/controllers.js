angular.module('map.controllers', [])

	.controller('MapController', function ($scope, $ionicLoading, MapService, AuthService) {
		$scope.mapCreated = function (map) { $scope.map = map };
		$scope.centerOnMe = function () { MapService.centerOnMe($scope, $ionicLoading) };
		$scope.watchMe = function() { MapService.watchMe($scope) };
		$scope.stopWatch = function() { MapService.stopWatch() };

		AuthService.setUserScope($scope);
	})

	.controller('MenuController', function($scope, $ionicSideMenuDelegate, AuthService) {
		$ionicSideMenuDelegate.canDragContent(false);
		AuthService.setUserScope($scope);
	})

	.controller('GCMController', function($scope) {
		$scope.notificationRegister = function() {
			successHandler = function(result) {
				console.log('Callback Success! Result = '+result);
			};

			errorHandler = function(error) {
				//alert(error);
			};

			var pushNotification = window.plugins.pushNotification;
			pushNotification.register(successHandler, errorHandler,{"senderID":"errorHandler","ecb":"app.onNotificationGCM"});
		}
	})

	.controller('FBAuthController', function($scope, AuthService) {

		$scope.login = function() { AuthService.login($scope) };
		$scope.logout = function() { AuthService.logout($scope) };
		$scope.getName = function() { return AuthService.getName($scope) };
		$scope.setUserScope = function() { AuthService.setUserScope($scope) };

		$scope.setUserScope();
	})
;

