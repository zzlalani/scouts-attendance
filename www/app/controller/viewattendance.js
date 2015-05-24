app.controller('ViewAttendanceCtrl', ['$scope', '$state', '$Storage', '$ionicHistory', 
	function($scope, $state, $Storage, $ionicHistory) {
	
	$scope.attendanceSummary = $Storage.getAttendanceSummary();

	$scope.back = function () {
		$ionicHistory.goBack(-1);
	}

}]);
