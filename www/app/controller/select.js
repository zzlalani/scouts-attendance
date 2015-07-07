app.controller('SelectCtrl', ['$scope', '$state', '$rootScope', '$Storage',
	function($scope, $state, $rootScope, $Storage) {

	$scope.select = function ( access ) {
		$rootScope.changeTheme(access);
		
		var user = $Storage.getUser();
		user.selectedAccess = access;
		$Storage.setUser(user);

		$state.go("index");
	}

}]);
