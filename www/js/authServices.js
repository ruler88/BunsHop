
angular.module('auth.services', [])

	.service('AuthService', function() {
		this.login = function($scope) {
			facebookConnectPlugin.login( ["public_profile,email"],
				function (response) {
					//login success
					facebookConnectPlugin.api('/me', ["email"],
						function(response) {
							$scope.my_email = response.email;
							$scope.my_name = response.first_name;
							//todo: put these in localstorage
					});
				},
				function (response) {
					alert("fail to log in fb " + response);
				});
		};

	});

