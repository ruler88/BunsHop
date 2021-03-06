var markers = {};
var directionsDisplay = [];
var infoWindows = [];
var eventHandlers = [];

angular.module('map.services', [])
	.service('MapService', function() {
		var mapService = this;

		var clearDirections = function() {
			angular.forEach(directionsDisplay, function(v, k) {
				v.setMap(null);
			});
			directionsDisplay.length = 0;
			angular.forEach(infoWindows, function(v, k) {
				v.close();
			});
			infoWindows.length = 0;
			angular.forEach(eventHandlers, function(v, k) {
				google.maps.event.removeListener(v);
			});
			eventHandlers.length = 0;
		};

		this.getDirections = function($scope, $rootScope) {
			var directionsService = new google.maps.DirectionsService();
			clearDirections();

			angular.forEach(markers, function(marker, key) {
				var dirDisplay = new google.maps.DirectionsRenderer({
					suppressMarkers: true
				});
				dirDisplay.setMap($rootScope.map);
				var request = {
					origin: marker.getPosition(),
					destination: $rootScope.locationMarker.getPosition(),
					travelMode: google.maps.TravelMode.DRIVING,
					durationInTraffic: true
				};
				directionsService.route(request, function(result, status) {
					var legs = result.routes[0].legs;
					var totalDistance = 0;
					var totalDuration = 0;
					for(var i=0; i<legs.length; i++) {
						totalDistance += legs[i].distance.value;
						totalDuration += legs[i].duration.value;
					}
					var distanceText = Math.round(totalDistance * 0.000621371) + " miles";
					var durationText = Math.round(totalDuration / 60) + " mins";
					if (status == google.maps.DirectionsStatus.OK) {
						dirDisplay.setDirections(result);
					}
					var infowindow = new google.maps.InfoWindow({
						content: distanceText + ",\n " + durationText
					});
					infowindow.open($rootScope.map, marker);
					infoWindows.push(infowindow);
					var infoWindowHandler = google.maps.event.addListener(marker, 'click', function() {
						infowindow.open($rootScope.map,marker);
					});
					eventHandlers.push(infoWindowHandler);
				});
				directionsDisplay.push(dirDisplay);
			});
			var trafficLayer = new google.maps.TrafficLayer();
			trafficLayer.setMap($rootScope.map);
		};

		this.updateMarkerLocation = function($scope, latitude, longitude, first_name, metaData, $rootScope, $ionicPopup, $http, time) {
			$rootScope.map.panTo(new google.maps.LatLng(latitude, longitude));
			if (metaData == 'locationMarker') {
				console.log("dropping pin");
				clearDirections();
				if($rootScope.locationMarker) {
					$rootScope.locationMarker.setMap(null);
				}
				var locationMarker = new google.maps.Marker({
					position: new google.maps.LatLng(latitude, longitude),
					map: $rootScope.map,
					icon: carrot
				});
				google.maps.event.addListener(locationMarker, 'dblclick', function() {
					clearDirections();
					$rootScope.locationMarker.setMap(null);
					$rootScope.locationMarker = null;
					$http({
						url: comServer,
						method: "GET",
						params: {first_name: first_name,
							removeMarker: 'removeMarker'}
					});
				});
				var infowindow = new google.maps.InfoWindow({
					content: first_name + " location marker"
				});
				infowindow.open($rootScope.map, locationMarker);
				$rootScope.locationMarker = locationMarker;
				$scope.lastSeenMap.carrot = time;
				return;
			}

			//not dropping new marker
			if ( !(first_name in markers) ) {
				var new_marker = new google.maps.Marker({
					position: new google.maps.LatLng(latitude, longitude),
					map: $rootScope.map,
					title: 'Click to zoom',
					animation: google.maps.Animation.BOUNCE,
					icon: bunsIcons[first_name]
				});
				markers[first_name] = new_marker;
			}
			markers[first_name].setMap($rootScope.map);
			markers[first_name].setPosition(new google.maps.LatLng(latitude, longitude));
			if(time) {
				$scope.lastSeenMap[first_name] = time;
			}
		};

		this.requestLocation = function($http, first_name) {
			$http({
				url: comServer,
				method: "GET",
				params: {first_name: first_name,
					requestLocation: 'requestLocation'}
			});
		};

		this.centerOnMe = function ($scope, $ionicLoading, $http, $rootScope) {
			console.log("Centering");
			if (!$rootScope.map) {
				return;
			}

			$scope.loading = $ionicLoading.show({
				template: 'Getting current location...',
				showBackdrop: false
			});
			mapService.requestLocation($http, $rootScope.first_name);

			navigator.geolocation.getCurrentPosition(function (pos) {
				console.log('Got pos', pos);
					$rootScope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
				mapService.updateMarkerLocation($scope, pos.coords.latitude, pos.coords.longitude, $rootScope.first_name, null, $rootScope, $http, new Date());
				$http({
					url: comServer,
					method: "GET",
					params: {first_name: $scope.first_name,
						latitude: pos.coords.latitude,
						longitude: pos.coords.longitude}
				});
				$ionicLoading.hide();
				mapService.zoom($rootScope);
			}, function (error) {
				alert('Unable to get location: ' + error.message);
				$ionicLoading.hide();
			},
			{ timeout: 10000 });
		};

		this.zoom = function($rootScope) {
			var bounds = new google.maps.LatLngBounds();
			angular.forEach(markers, function(marker, key) {
				bounds.extend(marker.getPosition());
			});
			if($rootScope.locationMarker) {
				bounds.extend($rootScope.locationMarker.getPosition());
			}
			$rootScope.map.fitBounds(bounds);
		};

		this.assignPopover = function($scope) {
			//popover displays last seen time
			$scope.openPopover = function($event) {
				$scope.popover.show($event);
			};
			$scope.closePopover = function() {
				$scope.popover.hide();
			};
			//Cleanup the popover when we're done with it!
			$scope.$on('$destroy', function() {
				$scope.popover.remove();
			});

			$scope.lastSeenMap = {};
		};

		this.setClock = function($scope, $timeout) {
			$scope.clock = "loading clock..."; // initialise the time variable
			$scope.tickInterval = 1000; //ms

			var tick = function () {
				$scope.clock = Date.now(); // get the current time
				$timeout(tick, $scope.tickInterval); // reset the timer
			};

			// Start the timer
			$timeout(tick, $scope.tickInterval);
		}
	});
