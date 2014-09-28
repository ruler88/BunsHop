angular.module('map.controllers', [])

	.controller('MapController', function ($scope, $ionicLoading, $rootScope, $http, MapService, AuthService) {
		$scope.mapCreated = function (map) { $scope.map = map };
		$scope.centerOnMe = function () { MapService.centerOnMe($scope, $ionicLoading, $http) };
		$scope.watchMe = function() { MapService.watchMe($scope) };
		$scope.stopWatch = function() { MapService.stopWatch() };

		AuthService.setUserScope($rootScope, $http);
	})

	.controller('MenuController', function($rootScope, $ionicSideMenuDelegate, AuthService, $http) {
		$ionicSideMenuDelegate.canDragContent(false);
		AuthService.setUserScope($rootScope, $http);
	})

	.controller('FBAuthController', function($scope, $ionicLoading, AuthService, $rootScope, $http) {
		$scope.login = function() { AuthService.login($ionicLoading, $rootScope, $http) };
		$scope.logout = function() { AuthService.logout($ionicLoading, $rootScope) };
		$scope.setUserScope = function() {	AuthService.setUserScope($rootScope, $http);	};

		$scope.setUserScope();
		$scope.today = new Date();
	})
;

