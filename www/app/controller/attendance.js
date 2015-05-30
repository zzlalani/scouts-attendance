app.controller('AttendanceCtrl', ['$scope', '$ionicHistory', '$Storage', '$filter', '$stateParams', '$Utils', '$cordovaDatePicker', '$ionicPopup', 'underscore',
	function($scope, $ionicHistory, $Storage, $filter, $stateParams, $Utils, $cordovaDatePicker, $ionicPopup, _) {
	
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
			present: {},
			name: "Regular Attendance"
		}
	}

	$scope.data = {
		name: $scope.attendance.name
	};

	$scope.changeName = function () {
		var namePopup = $ionicPopup.show({
			template: '<input type="text" ng-model="data.name">',
			title: 'Change attendance name',
			subTitle: 'eg: Chandraat',
			scope: $scope,
			buttons: [{ 
				text: 'Cancel',
				type: 'button-assertive',
				onTap: function(e) {
					$scope.data.name = $scope.attendance.name;
					return $scope.attendance.name;
				}
			}, {
				text: 'Save',
				onTap: function(e) {
					return $scope.data.name;
				}
			}]
		});

		namePopup.then(function(res) {
			$scope.attendance.name = res;
		});
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
			if ( date ) {
				$scope.attendance.date = new Date(date);
			}
		});
	}

	$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		if ( !_.isEmpty( $scope.attendance.present ) ) {
			var stat = false;

			for ( var i in $scope.attendance.present ) {
				if ( $scope.attendance.present[i].stat ) {
					stat = true;
					break;
				}
			}

			if (stat) {
				$scope.save();
			}
		}
		
	});

}]);