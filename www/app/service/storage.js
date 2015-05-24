angular.module('scouts.utils', [])

.factory('$Storage', ['localStorageService', function(localStorageService) {
	
	function Storage() {

		var StorageConstants

		// get the list of scouts
		this.getScouts = function () {
			alert("getScouts");
		}

		this.setAttendance = function (date,attendance) {
			localStorageService.set(date, attendance);

			// add date in attendance summary
			var attendanceSummary = this.getAttendanceSummary();
			if (attendanceSummary.indexOf(date) == -1) {
				attendanceSummary.push(date);
			}
			localStorageService.set("attendanceSummary",attendanceSummary);
		}

		this.getAttendanceByDate = function (date) {
			return localStorageService.get(date) || {
				date: date,
				present: {}
			}
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