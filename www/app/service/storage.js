utils.factory('$Storage', ['localStorageService', function(localStorageService) {
	
	function Storage() {

		var StorageConstants

		// get the list of scouts
		this.getScouts = function () {
			alert("getScouts");
		}

		this.setAttendance = function (guid,attendance) {
			localStorageService.set(guid, attendance);

			// add date in attendance summary
			var attendanceSummary = this.getAttendanceSummary();

			var count = 0;
			var total = this.getScouts().length;

			for ( var i in attendance.present) {
				if ( attendance.present[i].stat ) {
					count++;
				}
			}
			
			attendanceSummary[guid] = {
				date:attendance.date,
				guid:guid,
				name: attendance.name,
				total: total,
				count: count
			}
			localStorageService.set("attendanceSummary",attendanceSummary);
		}
		
		this.getAttendanceByGuid = function (guid) {
			return localStorageService.get(guid)
		}

		this.getAttendanceSummary = function () {
			return localStorageService.get("attendanceSummary") || {};
		}

		this.setAttendanceSummary = function ( summary ) {
			return localStorageService.set("attendanceSummary",summary);
		}

		this.getScouts = function () {
			return localStorageService.get( "scouts" ) || {};
		}

		this.setScouts = function ( scouts ) {
			localStorageService.set( "scouts", scouts );
		}

		this.removeAttendance = function ( guid ) {
			localStorageService.remove( guid );
			var summary = this.getAttendanceSummary();
			delete summary[guid];
			this.setAttendanceSummary(summary);
		}

		this.setUser = function ( user ) {
			localStorageService.set( "user", user );
		}

		this.getUser = function () {
			return localStorageService.get( "user" );
		}

		this.setDates = function ( dates ) {
			localStorageService.set( "dates", dates );
		}

		this.getDates = function () {
			return localStorageService.get( "dates" ) || {};
		}

	}

	return new Storage();

}]);