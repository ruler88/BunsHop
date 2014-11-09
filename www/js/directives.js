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
						$rootScope.updateMarkerLocation(position.k, position.B, $rootScope.first_name, 'locationMarker', new Date());

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

					$rootScope.backgroundAjaxGelocation = function(response) {
						console.log("NOTICE: Ajax background geolocation called");
						bgGeo.finish();
					};

					var callbackFn = function(location) {
						console.log('[js] BackgroundGeoLocation callback:  ' + location.latitude + ',' + location.longitude);
						$rootScope.backgroundAjaxGelocation();
					};

					var failureFn = function(error) {
						console.log('BackgroundGeoLocation error ' + error.toString());
					};

					var bgGeo = window.plugins.backgroundGeoLocation;
					bgGeo.configure(callbackFn, failureFn, {
						url: comServer, // <-- Android ONLY:  your server url to send locations to
						params: {
							first_name: $rootScope.first_name,    //  <-- Android ONLY:  HTTP POST params sent to your server when persisting locations.
							foo: 'bar'                              //  <-- Android ONLY:  HTTP POST params sent to your server when persisting locations.
						},
						desiredAccuracy: 10,
						stationaryRadius: 20,
						distanceFilter: 30,
						notificationTitle: 'Buns is hopping', // <-- android only, customize the title of the notification
						notificationText: '<3', // <-- android only, customize the text of the notification
						activityType: 'AutomotiveNavigation',
						debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
						stopOnTerminate: false // <-- enable this to clear background location settings when the app terminates
					});

					bgGeo.start();
				}

				if (document.readyState === "complete") {
					initialize();
				} else {
					google.maps.event.addDomListener(window, 'load', initialize);
				}
			}
		}
	}]);
