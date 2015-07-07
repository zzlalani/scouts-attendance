app.service('$Login', ['$q', '$Api', function($q, $Api) {
	
	function Login () {

		this.loginUser = function(data) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			return $Api.login(data);
		}

	}
	
	return new Login();
}]);
