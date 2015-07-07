utils.factory('$Storage', ['localStorageService', function(localStorageService) {
	
	function Storage() {

		var StorageConstants

		this.setAttendance = function ( guid, attendance, access ) {
			localStorageService.set(guid, attendance);

			// add date in attendance summary
			var attendanceSummary = this.getAttendanceSummary(access);

			var count = 0;
			var total = 0;
			for ( var i in attendance.present) {
				if ( attendance.present[i].stat ) {
					count++;
				}
			}
			for ( var s in this.getScouts(access) ) {
				total++;
			}
			
			attendanceSummary[guid] = {
				date:attendance.date,
				lastUpdatedDate: attendance.lastUpdatedDate,
				guid:guid,
				name: attendance.name,
				total: total,
				count: count
			}
			localStorageService.set(access + ".attendanceSummary",attendanceSummary);
		}
		
		this.getAttendanceByGuid = function ( guid ) {
			return localStorageService.get(guid);
		}

		this.getAttendanceSummary = function ( access ) {
			return localStorageService.get(access + ".attendanceSummary") || {};
		}

		this.getDelected = function () {
			return localStorageService.get("deleted") || {};
		}

		this.setAttendanceSummary = function ( summary, access ) {
			return localStorageService.set(access + ".attendanceSummary",summary);
		}

		this.getScouts = function ( access ) {
			return localStorageService.get( access + ".scouts" ) || {};
		}

		this.setScouts = function ( scouts, access ) {
			localStorageService.set( access + ".scouts", scouts );
		}

		this.removeAttendance = function ( guid, access ) {
			localStorageService.remove( guid );
			var summary = this.getAttendanceSummary( access );
			
			var deleteObject = {};
			deleteObject[guid] = {
				lastUpdatedDate: summary[guid].lastUpdatedDate
			};
			localStorageService.set( "deleted",deleteObject);

			delete summary[guid];
			this.setAttendanceSummary(summary, access);
		}

		this.setUser = function ( user ) {
			localStorageService.set( "user", user );
		}

		this.getUser = function () {
			return localStorageService.get( "user" );
		}

		this.getUserAccess = function () {
			var user = localStorageService.get( "user" );
			return {
				access: user.access,
				selectedAccess: user.selectedAccess
			};
		}

		this.removeUser = function () {
			return localStorageService.remove( "user" );
		}

		this.setDates = function ( dates, access ) {
			localStorageService.set( access + ".dates", dates );
		}

		this.getDates = function ( access ) {
			return localStorageService.get( access + ".dates" ) || {};
		}

	}

	return new Storage();

}]);