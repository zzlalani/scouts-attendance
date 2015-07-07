app.controller('LoginCtrl', ['$scope', '$rootScope', '$state', '$ionicPopup', '$Api', '$Storage', '$rootScope',
	function($scope, $rootScope, $state, $ionicPopup, $Api, $Storage, $rootScope) {
  	
	$scope.form = {};

	var redirect = function( user ) {
		if ( user && user.access ) {
			if ( user.access == "all" ) {
				$state.go('select');
			} else {
				$rootScope.changeTheme(user.access);
				
				var user = $Storage.getUser();
				user.selectedAccess = user.access;
				$Storage.setUser(user);

				$state.go('index');
			}
		}
	}

	$scope.login = function() {
		$Api.login($scope.form).success(function(data) {
			// console.log(data);
			if ( data.status == "OK" ) {

				$Storage.setUser( data.user );
				redirect(data.user);
				
			} else {
				var alertPopup = $ionicPopup.alert({
					title: 'Login failed!',
					template: '<center>Invalid username or password!</center>',
					buttons: [{
						text: 'Ok',
						type: 'button-' + $rootScope.defaultTheme
					}]
				});
			}
		}).error(function(data) {
			console.log(data);
			var alertPopup = $ionicPopup.alert({
				title: 'Login failed!',
				template: '<center>Something went worng, Please try again later!</center>',
				buttons: [{
					text: 'Ok',
					type: 'button-' + $rootScope.defaultTheme
				}]
			});
		});
	}

	if ( $Storage.getUser() ) {
		redirect($Storage.getUser());
	}

}]);
