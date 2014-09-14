
angular.module('auth.services', [])

	.service('AuthService', function() {
		var authService = this;

		this.login = function($scope) {
			facebookConnectPlugin.login( ["public_profile,email"],
				function (response) {
					//login success
					facebookConnectPlugin.api('/me', ["email"],
						function(response) {
							window.localStorage.setItem("email", response.email);
							window.localStorage.setItem("first_name", response.first_name);
							authService.getName($scope);
					});
				},
				function (response) {
					alert("fail to log in fb " + response);
				});
		};

		this.getName = function($scope) {
			alert("i was called!");
			$scope.name = window.localStorage.getItem("first_name");
			return window.localStorage.getItem("first_name");
		};
	});

