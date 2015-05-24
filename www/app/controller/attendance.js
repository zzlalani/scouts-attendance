app.controller('AttendanceCtrl', ['$scope', '$state', '$Storage', '$filter', function($scope, $state, $Storage, $filter) {
	
	$scope.attendance = {
		date: new Date(),
		
		present: function () {
			
		}

	};


	$scope.scouts = [
		{"id": 1, "firstName": "Sahibdin", "lastName": "Khowaja"},
		{"id": 2, "firstName": "Zain", "lastName": "Zulfiqar"},
		{"id": 3, "firstName": "Asad", "lastName": "Ali"},

		{"id": 4, "firstName": "Khalid", "lastName": "Chunara"},
		{"id": 5, "firstName": "Ali", "lastName": "Rehman"},

		{"id": 6, "firstName": "Irfan", "lastName": "Saleem"},
		{"id": 7, "firstName": "Areef", "lastName": "Jaffer"},

		{"id": 8, "firstName": "Fahad", "lastName": "Attai"},
		{"id": 9, "firstName": "Salman", "lastName": "Bahadur"},
		{"id": 10, "firstName": "Uzair", "lastName": "Ali"},
		{"id": 11, "firstName": "Salik", "lastName": "Saddarudin"},
		{"id": 12, "firstName": "Zeeshan", "lastName": "Lalani"},
		{"id": 13, "firstName": "Jahangir", "lastName": "Charania"},
		{"id": 14, "firstName": "Sameer", "lastName": "Saleem"}
	];

	var presents = {};

	$scope.attendanceChange = function (id, present) {
		if (present) {
			presents[id] = new Date();
		} else {
			delete(presents[id]);
		}
	}

	$scope.save = function () {
		var date = $filter('date')($scope.attendance.date,'yyyy-MM-dd')
		var attendance = {};
		attendance.date = date;
		attendance.present = [];
		for ( var i in presents ) {
			attendance.present.push({
				id:i,
				dateTime: new Date()
			});
		}
		$Storage.setAttendance(date,attendance);
	}

	$scope.back = function () {
		$state.go("index");
	}

}]);
