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
			attendanceSummary.push({
				date:attendance.date,
				guid:guid
			});
			localStorageService.set("attendanceSummary",attendanceSummary);
		}
		
		this.getAttendanceByGuid = function (guid) {
			return localStorageService.get(guid)
		}

		this.getAttendanceSummary = function () {
			return localStorageService.get("attendanceSummary") || [];
		}

		this.getScouts = function () {
			return [
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
		}

	}

	return new Storage();

}]);