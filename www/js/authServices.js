
angular.module('auth.services', [])

	.service('AuthService', function() {
		var bunsIcons = {
			Kai: 'img/kai_buns.gif',
			Sarah: 'img/sarah_buns.gif'
		};
		var authService = this;

		this.login = function($scope) {
			facebookConnectPlugin.login( ["public_profile,email"],
				function (response) {
					//login success
					facebookConnectPlugin.api('/me', ["email"],
						function(response) {
							storeUser($scope, response);

							authService.getName($scope);
					});
				},
				function (response) {
					alert("fail to log in fb " + response);
				});
		};

		this.getName = function($scope) {
			return window.localStorage.getItem("first_name");
		};

		this.storeUser = function($scope, response) {
			window.localStorage.setItem("email", response.email);
			window.localStorage.setItem("first_name", response.first_name);
			window.localStorage.setItem("img_path", bunsIcons[response.first_name]);


			$scope.name = window.localStorage.getItem("first_name");
			$scope.email = window.localStorage.getItem("email");

		}
	});

