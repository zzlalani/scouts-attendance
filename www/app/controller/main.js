app.controller('MainCtrl', ['$rootScope', '$Storage', function($rootScope, $Storage) {

	$rootScope.defaultTheme = 'calm';	
	$rootScope.theme = null;
	$rootScope.changeTheme = function ( accessType ) {
		if ( accessType ) {

			if ( accessType == 'shaheen' ) {
				$rootScope.theme = 'energized';
			} else if ( accessType == 'scouts' ) {
				$rootScope.theme = 'balanced';
			} else {
				$rootScope.theme = 'assertive';
			}
		} else {
			$rootScope.theme = 'assertive';
		}
	}

	if ( $Storage.getUser() ) {
		var access = $Storage.getUserAccess();
		$rootScope.changeTheme(access.selectedAccess);
	}

}]);