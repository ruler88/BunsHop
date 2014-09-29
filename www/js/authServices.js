
angular.module('auth.services', [])

	.service('AuthService', function() {
		var authService = this;

		this.login = function($ionicLoading, $rootScope, $http) {
			$ionicLoading.show({
				template: 'Logging In'
			});

			facebookConnectPlugin.login( ["public_profile,email"],
				function (response) {
					//login success
					facebookConnectPlugin.api('/me', ["email"],
						function(response) {
							authService.storeUser(response, $rootScope, $http);
							$rootScope.isLoggedIn = true;
							$ionicLoading.hide();
					});
				},
				function (response) {
					$ionicLoading.hide();
					alert("fail to log in fb " + response);
				});
		};

		this.logout = function($ionicLoading, $rootScope) {
			$ionicLoading.show({
				template: 'Good Bye!'
			});
			facebookConnectPlugin.logout(
				function(response) {
					console.log("logout: " + response);
					window.localStorage.removeItem("first_name");
					window.localStorage.removeItem("email");
					window.localStorage.removeItem("img_path");

					delete $rootScope.first_name;
					delete $rootScope.email;

					$rootScope.isLoggedIn = false;
					$ionicLoading.hide();
				});
		};

		this.setUserScope = function($rootScope, $http) {
			$rootScope.first_name = window.localStorage.getItem("first_name");
			$rootScope.email = window.localStorage.getItem("email");
			$rootScope.img_path = window.localStorage.getItem("img_path");
			$rootScope.isLoggedIn = (typeof $rootScope.first_name !== 'undefined');
			$http({
				url: comServer,
				method: "GET",
				params: {first_name: $rootScope.first_name,
								regid: window.localStorage.getItem("regid")}
			});
		};

		this.storeUser = function(response, $rootScope, $http) {
			window.localStorage.setItem("email", response.email);
			window.localStorage.setItem("first_name", response.first_name);
			window.localStorage.setItem("img_path", bunsIcons[response.first_name]);

			authService.setUserScope($rootScope, $http);
		};
	});

