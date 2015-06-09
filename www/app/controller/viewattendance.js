app.controller('ViewAttendanceCtrl', ['$scope', '$state', '$Storage', '$ionicPopup', 'underscore',
	function($scope, $state, $Storage, $ionicPopup, _) {
	
	$scope.attendanceSummary = $Storage.getAttendanceSummary();
	
	$scope.shouldShow = function () {
		$scope.shouldShowDelete = !$scope.shouldShowDelete;
	};
	
	$scope.removeItem = function (guid) {
		$scope.showConfirm(guid);
	};

	$scope.showConfirm = function(guid) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Delete Attendance',
			template: 'Are you sure you want to delete this attendance?'
		});
		
		confirmPopup.then(function(res) {
			if(res) {
				var attendance = $scope.attendanceSummary[guid];
				delete $scope.attendanceSummary[guid];
				$Storage.removeAttendance( guid );
				showEmpty();
			}
		});
	};

	$scope.addNew = function () {
		$state.go('attendance');
	};

	$scope.view = {
		orderReverse: true
	}

	$scope.changeOrder = function ( order ) {
		$scope.orderReverse = order;
	}

	$scope.shouldShowDelete = false;
	$scope.orderReverse = true;

	$scope.listEmpty = false;
	var showEmpty = function () {
		if ( _.isEmpty( $scope.attendanceSummary ) ) {
			$scope.listEmpty = true;
		}
	}
	showEmpty();

}]);
