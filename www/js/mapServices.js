var marker;

angular.module('map.services', [])

	.service('MapService', function() {
		var updateMarkerLocation = function($scope, googPosition) {
			if (!marker) {
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(googPosition),
					map: $scope.map,
					title: 'Click to zoom',
					animation: google.maps.Animation.BOUNCE,
					icon: window.localStorage.getItem("img_path")
				});
			}
			marker.setPosition(googPosition);
		};

		this.centerOnMe = function ($scope, $ionicLoading, $http) {
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
				updateMarkerLocation($scope, googPosition);
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