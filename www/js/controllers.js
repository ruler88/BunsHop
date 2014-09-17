angular.module('map.controllers', [])

	.controller('MapController', function ($scope, $ionicLoading, $rootScope, MapService, AuthService) {
		$scope.mapCreated = function (map) { $scope.map = map };
		$scope.centerOnMe = function () { MapService.centerOnMe($scope, $ionicLoading) };
		$scope.watchMe = function() { MapService.watchMe($scope) };
		$scope.stopWatch = function() { MapService.stopWatch() };

		AuthService.setUserScope($rootScope);
	})

	.controller('MenuController', function($rootScope, $ionicSideMenuDelegate, AuthService) {
		$ionicSideMenuDelegate.canDragContent(false);
		AuthService.setUserScope($rootScope);
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

	.controller('FBAuthController', function($scope, $ionicLoading, AuthService, $rootScope) {
		$scope.login = function() { AuthService.login($ionicLoading, $rootScope) };
		$scope.logout = function() { AuthService.logout($ionicLoading, $rootScope) };
		$scope.setUserScope = function() {	AuthService.setUserScope($rootScope);	};

		$scope.setUserScope();
		$scope.today = new Date();
	})
;

