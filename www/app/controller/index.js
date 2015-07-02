app.controller('IndexCtrl', ['$scope', '$Background', '$Storage', '$state', 
	function($scope, $Background, $Storage, $state) {
	
	$Background.start();

	$scope.logout = function () {
		$Storage.removeUser();
		$state.go("login");
	}
}]);
