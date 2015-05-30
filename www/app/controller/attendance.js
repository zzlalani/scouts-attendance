app.controller('AttendanceCtrl', ['$scope', '$ionicHistory', '$Storage', '$filter', '$stateParams', '$Utils', '$cordovaDatePicker', 'underscore',
	function($scope, $ionicHistory, $Storage, $filter, $stateParams, $Utils, $cordovaDatePicker, _) {
	
	$scope.title = "Regular Attendance";

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
		if ( window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard ) {
			window.cordova.plugins.Keyboard.close();
		}
	}

	$scope.save = function () {
		$Storage.setAttendance(guid,$scope.attendance);
		// $ionicHistory.goBack(-1);
	}

	$scope.changeDate = function () {
		
		var options = {
	    date: new Date($scope.attendance.date),
	    mode: 'date', // or 'time'
	  };

		$cordovaDatePicker.show(options).then(function(date){
        $scope.attendance.date = new Date(date);
    });
	}

	$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		
		if ( !_.isEmpty( $scope.attendance.present ) ) {
			console.log("****** Saving Attendance ******");
			$scope.save();
		}
		
	});

}]);