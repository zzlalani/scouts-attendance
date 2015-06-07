app.service('$Background', ['BackgroundTime', '$Api', '$Storage', '$timeout', '$Utils', '$cordovaNetwork',
	function(BackgroundTime, $Api, $Storage, $timeout, $Utils, $cordovaNetwork) {

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
			
			var bg = this;

			var dates = $Storage.getDates();

			var scoutsSyncDate = $Utils.date(0);
			if ( dates.scoutsSync ) {
				scoutsSyncDate = $Utils.date(dates.scoutsSync);
			}

			console.log(scoutsSyncDate, dates.scoutsSync);

			$Api.getScouts(scoutsSyncDate).success(function(data) {
				// console.log("success",data);
				console.log(data.data.length + " Scouts updated");
				if ( data.data.length > 0 ) {

					var syncScouts = data.data;
					var scouts = $Storage.getScouts();
					var latestDate = scoutsSyncDate;
					angular.forEach(syncScouts, function (scout, key) {
						scouts[scout._id] = scout;
						latestDate = new Date();
					});
					dates.scoutsSync = latestDate;

					$Storage.setScouts( scouts );
					$Storage.setDates( dates );

				}

			}).error(function(data) {
				console.log("error",data);
			});

		}

	}

	var loop = function (bg) {
		if ( bg.startTimeout ) {
			$timeout(function() {
				loop(bg);
			}, BackgroundTime);
		}

		// prevent sync and post if internet is offline
		// if ( $cordovaNetwork.isOffline() ) {
		// 	bg.running = false;
		// 	return false;
		// }

		bg.running = true;
		bg.syncData();
		// bg.postData();

		// increase loop counter
		bg.loopCounter++;
		console.log( "Sync #" + bg.loopCounter );
	}

	return new Background();
}]);