app.controller('AttendanceCtrl', ['$scope', '$state', '$Storage', '$filter', '$stateParams', 
	function($scope, $state, $Storage, $filter, $stateParams) {
		
	var date;
	if ( $stateParams.date ) {
		date = $stateParams.date;
	} else {
		date = $filter('date')(new Date(),'yyyy-MM-dd');
	}

	$scope.attendance = $Storage.getAttendanceByDate(date);
	
	$scope.attendance.date = new Date($scope.attendance.date);

	$scope.scouts = $Storage.getScouts();

	$scope.attendanceChange = function (id) {
		$scope.attendance.present[id].dateTime = new Date();
	}

	$scope.save = function () {
		$Storage.setAttendance($filter('date')($scope.attendance.date,'yyyy-MM-dd'),$scope.attendance);
	}

	$scope.back = function () {
		$state.go("index");
	}

}]);
