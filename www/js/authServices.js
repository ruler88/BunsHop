
angular.module('auth.services', [])

	.service('AuthService', function() {
		var authService = this;
		var bunsIcons = {
			Kai: 'img/kai_buns.gif',
			Sarah: 'img/sarah_buns.gif',
			Unknown: 'img/unknown.png'
		};

		this.login = function($scope, $ionicLoading) {
			$ionicLoading.show({
				template: 'Logging In'
			});

			facebookConnectPlugin.login( ["public_profile,email"],
				function (response) {
					//login success
					facebookConnectPlugin.api('/me', ["email"],
						function(response) {
							authService.storeUser($scope, response);
							$scope.isLoggedIn = true;
							$ionicLoading.hide();
					});
				},
				function (response) {
					$ionicLoading.hide();
					alert("fail to log in fb " + response);
				});
		};

		this.logout = function($scope, $ionicLoading) {
			$ionicLoading.show({
				template: 'Good Bye!'
			});
			facebookConnectPlugin.logout(
				function(response) {
					console.log("logout: " + response);
					window.localStorage.removeItem("first_name");
					window.localStorage.removeItem("email");
					window.localStorage.removeItem("img_path");

					delete $scope.first_name;
					delete $scope.email;
					delete $scope.img_path;

					$scope.isLoggedIn = false;
					$ionicLoading.hide();
				});
		};

		this.setUserScope = function($scope) {
			$scope.first_name = window.localStorage.getItem("first_name");
			$scope.email = window.localStorage.getItem("email");
			$scope.img_path = window.localStorage.getItem("img_path");
			$scope.isLoggedIn = (typeof $scope.first_name !== 'undefined');
		};

		this.getName = function($scope) {
			authService.setUserScope($scope);
			return $scope.first_name;
		};

		this.storeUser = function($scope, response) {
			window.localStorage.setItem("email", response.email);
			window.localStorage.setItem("first_name", response.first_name);
			window.localStorage.setItem("img_path", bunsIcons[response.first_name]);

			authService.setUserScope($scope);
		};
	});

