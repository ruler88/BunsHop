angular.module('map.directives', [])

	.directive('map', function() {
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
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					var map = new google.maps.Map($element[0], mapOptions);

					$scope.onCreate({map: map});
					$scope.map = map;

					// Stop the side bar from dragging when mousedown/tapdown on the map
					google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
						e.preventDefault();
						return false;
					});


					navigator.geolocation.getCurrentPosition(function (pos) {
						$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
					}, function (error) {
						alert('Unable to get location: ' + error.message);
					});
				}

				if (document.readyState === "complete") {
					initialize();
				} else {
					google.maps.event.addDomListener(window, 'load', initialize);
				}
			}
		}
	});
