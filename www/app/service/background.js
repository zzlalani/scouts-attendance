app.service('$Background', ['BackgroundTime', '$rootScope', '$Api', '$Storage', '$timeout', '$Utils', '$cordovaNetwork',
	function(BackgroundTime, $rootScope, $Api, $Storage, $timeout, $Utils, $cordovaNetwork) {

	function Background () {

		this.startTimeout = false;
		this.running = false;
		this.loopCounter = 0;

		this.start = function () {

			this.startTimeout = true;
			loop(this);
		}

		this.stop = function () {
			this.startTimeout = false;
		}

		/**
		 * sync/load Scouts & Attendance Data
		 *
		 * @params:
		 *
		 **/
		this.syncData = function() {
			
			var dates = $Storage.getDates();

			var scoutsSyncDate, attendanceSyncDate;
			if ( dates.scoutsSync ) {
				scoutsSyncDate = $Utils.date(dates.scoutsSync);
			} else {
				scoutsSyncDate = $Utils.date(0);
			}

			if ( dates.attendanceSync ) {
				attendanceSyncDate = $Utils.date(dates.attendanceSync);
			} else {
				attendanceSyncDate = $Utils.date(0);
			}

			$Api.getScouts(scoutsSyncDate).success(function(data) {
				// console.log("success",data);
				console.log(data.data.length + " Scouts updated");
				if ( data.data.length > 0 ) {

					var syncScouts = data.data;
					var scouts = $Storage.getScouts();
					angular.forEach(syncScouts, function (scout, key) {
						scout.fullname = scout.firstName + " " + scout.lastName;
						scouts[scout._id] = scout;
					});
					dates.scoutsSync = new Date();

					$Storage.setScouts( scouts );
					$Storage.setDates( dates );

				}

			}).error(function(data) {
				console.log("error",data);
			});

			$Api.getAttendance(attendanceSyncDate).success(function(data) {
				// console.log("success",data);
				console.log(data.data.length + " Attendance fetched");
				if ( data.data.length > 0 ) {

					var syncAttendance = data.data;
					var attendanceSyncDateObj = new Date(attendanceSyncDate);

					angular.forEach(syncAttendance, function (attendance, key) {
						
						var appAttendance = $Storage.getAttendanceByGuid( attendance.guid );
						if ( appAttendance ) {
							appAttendance.guid = attendance.guid;
							appAttendance.name = attendance.name;
							appAttendance.lastUpdatedDate = attendance.lastUpdatedDate;
							appAttendance.date = attendance.date;
							appAttendance.syncedDate = attendance.syncedDate;

							for ( var i in attendance.present ) {
								// if attendance already exists update -> else add
								if ( appAttendance.present[i] ) {
								
									var appDate = new Date(appAttendance.present[i].dateTime);
									var docDate = new Date(attendance.present[i].dateTime);

									if ( docDate >= appDate ) {

										appAttendance.present[i] = attendance.present[i];	
									}
								} else {
									appAttendance.present[i] = attendance.present[i];
								}

							}

						} else {
							appAttendance = attendance;
						}
						
						$Storage.setAttendance( appAttendance.guid, appAttendance );
						
						if ( new Date(appAttendance.syncedDate) > attendanceSyncDateObj ) {
							attendanceSyncDate = appAttendance.syncedDate;
						}
					});

					dates.attendanceSync = attendanceSyncDate;
					$Storage.setDates( dates );
					syncComplete();

				} // data.data.length > 0
				boradCast();

			}).error(function(data) {
				console.log("error",data);
			});

		}

		/**
		 * post Attendance Data
		 *
		 * @params:
		 *
		 **/
		this.postData = function () {
			console.log("IN POST");
			var dates = $Storage.getDates();

			var attendanceUpdatedDate;
			if ( dates.attendanceUpdated ) {
				attendanceUpdatedDate = new Date(dates.attendanceUpdated);
			} else {
				attendanceUpdatedDate = new Date(0);
			}

			var attendanceSummary = $Storage.getAttendanceSummary();
			var callCounter = 0; 
			var successCounter = 0;

			// post calls
			angular.forEach(attendanceSummary, function (a, key) {
				
				var lastUpdatedDate = new Date(a.lastUpdatedDate)
				if ( lastUpdatedDate > attendanceUpdatedDate ) {
					callCounter++;
					var attendance = $Storage.getAttendanceByGuid( a.guid );

					$Api.postAttendance(attendance).success(function(data) {
						
						successCounter++;
						if ( successCounter == callCounter ) {
							
							dates.attendanceUpdated = new Date();

							$Storage.setDates( dates );

						}
					}).error(function(data) {
						console.log("error",data);
					});

				}
			});

		}

		this.process = function () {

		// prevent sync and post if internet is offline
		// if ( $cordovaNetwork.isOffline() ) {
		// 	bg.running = false;
		// 	return false;
		// }

		this.syncData();
		this.postData();
	}

	}

	var syncComplete = function() {
		$rootScope.$broadcast("syncCompleted");
	}

	var boradCast = function () {
		$rootScope.$broadcast('scroll.refreshComplete');
	}

	var loop = function ( bg ) {
		if ( bg.startTimeout ) {
			$timeout(function() {
				loop(bg);
			}, BackgroundTime);
		}

		
		bg.process();
		this.running = true;

		// increase loop counter
		bg.loopCounter++;
		console.log( "Sync #" + bg.loopCounter );
	}

	return new Background();
}]);