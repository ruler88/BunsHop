angular.module('map.directives', [])

	.directive('map', ['$http', '$rootScope', function($http, $rootScope) {
		return {
			restrict: 'E',
			scope: {
				onCreate: '&'
			},
			link: function ($scope, $element, $attr) {
				function initialize() {

					var mapOptions = {
						center: new google.maps.LatLng(37.757, -122.479),
						zoom: 16,
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						disableDoubleClickZoom: true
					};
					var map = new google.maps.Map($element[0], mapOptions);

					$scope.onCreate({map: map});
					$rootScope.map = map;

					// Stop the side bar from dragging when mousedown/tapdown on the map
					google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
						e.preventDefault();
						return false;
					});

					google.maps.event.addListener(map, 'dblclick', function(e) {
						//drop pin when clicked
						var position = e.latLng;

						//latitude, longitude, first_name, metaData
						$rootScope.updateMarkerLocation(position.k, position.B, $rootScope.first_name, 'locationMarker');

						$http({
							url: comServer,
							method: "GET",
							params: {first_name: $rootScope.first_name,
								latitude: position.k,
								longitude: position.B,
								metaData: 'locationMarker'}
						});
					});

					navigator.geolocation.getCurrentPosition(function (pos) {
						$rootScope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
					});
				}

				if (document.readyState === "complete") {
					initialize();
				} else {
					google.maps.event.addDomListener(window, 'load', initialize);
				}
			}
		}
	}]);
