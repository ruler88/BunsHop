var marker = {};

angular.module('map.services', [])
	.service('MapService', function() {
		var mapService = this;

		this.updateMarkerLocation = function($scope, googPosition, first_name) {
			if ( !(first_name in marker) ) {
				var new_marker = new google.maps.Marker({
					position: new google.maps.LatLng(googPosition),
					map: $scope.map,
					title: 'Click to zoom',
					animation: google.maps.Animation.BOUNCE,
					icon: bunsIcons[first_name]
				});
				marker[first_name] = new_marker
			}
			marker[first_name].setPosition(googPosition);
		};

		this.centerOnMe = function ($scope, $ionicLoading, $http, $rootScope) {
			console.log("Centering");
			if (!$scope.map) {
				return;
			}

			$scope.loading = $ionicLoading.show({
				template: 'Getting current location...',
				showBackdrop: false
			});

//			$http({
//				url: comServer,
//				method: "GET",
//				params: {first_name: $scope.first_name,
// 								test: 'A'}
//			});

			navigator.geolocation.getCurrentPosition(function (pos) {
				console.log('Got pos', pos);
				var googPosition = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
				$scope.map.setCenter(googPosition);
				mapService.updateMarkerLocation($scope, googPosition, $rootScope.first_name);
				$ionicLoading.hide();
			}, function (error) {
				alert('Unable to get location: ' + error.message);
				$ionicLoading.hide();
			},
			{ timeout: 10000 });
		};


//		this.watchMe = function($scope) {
//			function onSuccess(pos) {
//				updateMarkerLocation($scope, new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
//
//				var notify = 'Latitude: '  + pos.coords.latitude  + "\n" +
//					'Longitude: ' + pos.coords.longitude;
//				console.log(notify);
//			}
//
//			// onError Callback receives a PositionError object
//			function onError(error) {
//				//TODO send msg about no loc
//				alert('code: '    + error.code    + '\n' +
//					'message: ' + error.message + '\n');
//			}
//
//			// Options: throw an error if no update is received every 30 seconds.
//			$scope.watchId = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
//		};
//
//		this.stopWatch = function() {
//			if (!$scope.watchId) {
//				navigator.geolocation.clearWatch($scope.watchId);
//				console.log("Stopped following");
//			}
//		};
		});
