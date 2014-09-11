angular.module('map.controllers', [])

	.controller('MapController', function ($scope, $ionicLoading, MapService) {

		$scope.mapCreated = function (map) {
			$scope.map = map;
		};

		$scope.centerOnMe = function () {
			MapService.centerOnMe($scope, $ionicLoading);
		};
	})

	.controller('MenuController', function($scope, $ionicSideMenuDelegate) {
		//disable left drag to open menu
		$ionicSideMenuDelegate.canDragContent(false);
	})
;

