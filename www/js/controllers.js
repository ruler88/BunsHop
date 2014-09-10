angular.module('starter.controllers', [])

	.controller('MapController', function ($scope, $ionicLoading) {

		var bunsIcons = {
			kai: 'img/kai_buns.gif',
			sarah: 'img/sarah_buns.gif'
		};

		$scope.mapCreated = function (map) {
			$scope.map = map;
		};

		$scope.centerOnMe = function () {
			console.log("Centering");
			if (!$scope.map) {
				return;
			}

			$scope.loading = $ionicLoading.show({
				content: 'Getting current location...',
				showBackdrop: false
			});

			navigator.geolocation.getCurrentPosition(function (pos) {
				console.log('Got pos', pos);
				$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
				var marker = new google.maps.Marker({
					position: $scope.map.getCenter(),
					map: $scope.map,
					title: 'Click to zoom',
					animation: google.maps.Animation.BOUNCE,
					icon: bunsIcons.sarah
				});

				$scope.loading.hide();
			}, function (error) {
				alert('Unable to get location: ' + error.message);
			});
		};
	})

	.controller('MenuController', function($scope, $ionicSideMenuDelegate) {
		//disable left drag to open menu
		$ionicSideMenuDelegate.canDragContent(false);
	})
;

