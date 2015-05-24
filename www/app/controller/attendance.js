app.controller('AttendanceCtrl', ['$scope', '$ionicHistory', '$Storage', '$filter', '$stateParams', '$Utils', 
	function($scope, $ionicHistory, $Storage, $filter, $stateParams, $Utils) {

	var guid;
	var date;
	if ( $stateParams.guid ) {
		guid = $stateParams.guid;
		$scope.attendance = $Storage.getAttendanceByGuid(guid);
		$scope.attendance.date = new Date($scope.attendance.date);
	} else {
		guid = $Utils.guid();
		date = $filter('date')(new Date(),'yyyy-MM-dd');
		$scope.attendance = {
			guid:guid,
			date: new Date(),
			present: {}
		}
	}

	$scope.scouts = $Storage.getScouts();

	$scope.attendanceChange = function (id) {
		$scope.attendance.present[id].dateTime = new Date();
	}

	$scope.save = function () {
		$Storage.setAttendance(guid,$scope.attendance);
	}

	$scope.back = function () {
		$ionicHistory.goBack(-1);
	}

}]);
