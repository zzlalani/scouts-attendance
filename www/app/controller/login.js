app.controller('LoginCtrl', ['$scope', '$state', '$ionicPopup', '$Login', '$Storage', 
	function($scope, $state, $ionicPopup, $Login, $Storage) {
  	
	$scope.form = {};

	if ( $Storage.getUser() ) {
		$state.go('index');
	}

	$scope.login = function() {
		$Login.loginUser($scope.form).success(function(data) {
			// console.log(data);
			if ( data.status == "OK" ) {
				$Storage.setUser( data.user );
				$state.go('index');
			} else {
				var alertPopup = $ionicPopup.alert({
					title: 'Login failed!',
					template: '<center>Invalid username or password!</center>',
					buttons: [{
						text: 'Ok',
						type: 'button-assertive'
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
					type: 'button-assertive'
				}]
			});
		});
	}

	if ( $Storage.getUser() ) {
		$state.go('index');
	}

}]);
