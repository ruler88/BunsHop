
angular.module('auth.services', [])

	.service('AuthService', function() {
		var authService = this;

		this.login = function($scope) {
			facebookConnectPlugin.login( ["public_profile,email"],
				function (response) {
					//login success
					facebookConnectPlugin.api('/me', ["email"],
						function(response) {
							authService.storeUser($scope, response);
					});
				},
				function (response) {
					alert("fail to log in fb " + response);
				});
		};

		this.logout = function($scope) {
			facebookConnectPlugin.logout(
				function(response) {
					console.log("logout: " + response);
					window.localStorage.removeItem("first_name");
					window.localStorage.removeItem("email");
					window.localStorage.removeItem("img_path");

					delete $scope.first_name;
					delete $scope.email;
					delete $scope.img_path;
				});
		};

		this.setUserScope = function($scope) {
			$scope.first_name = window.localStorage.getItem("first_name");
			$scope.email = window.localStorage.getItem("email");
			$scope.img_path = window.localStorage.getItem("img_path");
		};

		this.getName = function($scope) {
			authService.setUserScope($scope);
			return $scope.first_name;
		};

		this.storeUser = function($scope, response) {
			var bunsIcons = window.localStorage.getItem("bunsIcons");
			window.localStorage.setItem("email", response.email);
			window.localStorage.setItem("first_name", response.first_name);
			window.localStorage.setItem("img_path", bunsIcons[response.first_name]);

			authService.setUserScope($scope);
		};
	});

