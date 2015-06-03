app.service('$Login', ['$q', '$Api', function($q, $Api) {
	
	function Login () {

		this.loginUser = function(data) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			return $Api.login(data);
			// if (data.userName == 'user' && data.password == 'user') {
			// 	deferred.resolve('Welcome ' + name + '!');
			// } else {
			// 	deferred.reject('Wrong credentials.');
			// }
			// promise.success = function(fn) {
			// 	promise.then(fn);
			// 	return promise;
			// }
			// promise.error = function(fn) {
			// 	promise.then(null, fn);
			// 	return promise;
			// }
			// return promise;
		}

	}
	
	return new Login();
}]);
