app.service('$Api', ['$http', '$q', 'ServiceUrl', function($http, $q, ServiceUrl) {

	function Api () {

		this.login = function ( data ) {
			
			var deferred = $q.defer();
			var promise = deferred.promise;

			$http.post(ServiceUrl + 'login', data)
			.success(function(data, status, headers, config) {
				deferred.resolve({
					status: data.status,
					user: data.user
				});
			})
			.error(function(data, status, headers, config) {
				deferred.reject({
					status: 'FAIL'
				});
			});

			promise.success = function(fn) {
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn) {
				promise.then(null, fn);
				return promise;
			}
			return promise;
		}

		this.getScouts = function ( date, access ) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			$http.get(ServiceUrl + 'scouts/list/' + access + '/' + date)
			.success(function(data, status, headers, config) {
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config) {
				deferred.reject({
					status: 'FAIL'
				});
			});

			promise.success = function(fn) {
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn) {
				promise.then(null, fn);
				return promise;
			}
			return promise;
		}

		this.postAttendance = function ( attendance, access ) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			$http.post(ServiceUrl + 'attendance/add/' + access, attendance)
			.success(function(data, status, headers, config) {
				deferred.resolve({
					status: data.status
				});
			})
			.error(function(data, status, headers, config) {
				deferred.reject({
					status: 'FAIL'
				});
			});

			promise.success = function(fn) {
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn) {
				promise.then(null, fn);
				return promise;
			}
			return promise;
		}

		this.getAttendance = function ( date, access ) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			$http.get(ServiceUrl + 'attendance/list/' + access + '/' +  date)
			.success(function(data, status, headers, config) {
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config) {
				deferred.reject({
					status: 'FAIL'
				});
			});

			promise.success = function(fn) {
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn) {
				promise.then(null, fn);
				return promise;
			}
			return promise;
		}
	}

	return new Api();
}]);