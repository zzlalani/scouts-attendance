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
  	}

    this.getAttendanceByDate = function (date) {
      localStorageService.get(date);
    }

  }

	return new Storage();

}]);