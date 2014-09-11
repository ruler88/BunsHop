
var bunsIcons = {
	kai: 'img/kai_buns.gif',
	sarah: 'img/sarah_buns.gif'
};


angular.module('map.services', [])
	.service('MapService', function() {
		this.centerOnMe = function ($scope, $ionicLoading) {
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
					position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
					map: $scope.map,
					title: 'Click to zoom',
					animation: google.maps.Animation.BOUNCE,
					icon: bunsIcons.sarah
				});

				$ionicLoading.hide();
			}, function (error) {
				alert('Unable to get location: ' + error.message);
			});
		}
	});