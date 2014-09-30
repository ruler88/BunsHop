angular.module('map.controllers', [])

	.controller('MapController', function ($scope, $ionicLoading, $rootScope, $http, MapService, AuthService) {
		$scope.mapCreated = function (map) { $scope.map = map };
		$rootScope.centerOnMe = function () { MapService.centerOnMe($scope, $ionicLoading, $http, $rootScope) };
		$rootScope.updateMarkerLocation = function(latitude, longitude, first_name) {
			MapService.updateMarkerLocation($scope, latitude, longitude, first_name);
		};
//		$scope.watchMe = function() { MapService.watchMe($scope) };
//		$scope.stopWatch = function() { MapService.stopWatch() };

		AuthService.setUserScope($rootScope, $http);
	})

	.controller('MenuController', function($rootScope, $ionicSideMenuDelegate, AuthService, $http, MapService) {
		$ionicSideMenuDelegate.canDragContent(false);
		AuthService.setUserScope($rootScope, $http);
		$rootScope.respondLocation = function() { MapService.respondLocation($rootScope, $http); }
	})

	.controller('FBAuthController', function($scope, $ionicLoading, AuthService, $rootScope, $http) {
		$scope.login = function() { AuthService.login($ionicLoading, $rootScope, $http) };
		$scope.logout = function() { AuthService.logout($ionicLoading, $rootScope) };
		$scope.setUserScope = function() {	AuthService.setUserScope($rootScope, $http);	};

		$scope.setUserScope();
		$scope.today = new Date();
	})
;

