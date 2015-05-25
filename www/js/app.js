// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('smartattendance', [
  'ionic',
  'ionic-datepicker',
  'LocalStorageModule',
  'scouts.utils'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('index', {
    url: '/',
    templateUrl: 'app/templates/index.html',
    controller: 'IndexCtrl'
  })
  .state('attendance', {
    url: '/attendance',
    templateUrl: 'app/templates/attendance.html',
    controller: 'AttendanceCtrl'
  })
  .state('viewattendance', {
    url: '/viewattendance',
    templateUrl: 'app/templates/viewattendance.html',
    controller: 'ViewAttendanceCtrl'
  })
  .state('getattendance', {
    url: '/getattendance/:guid',
    templateUrl: 'app/templates/attendance.html',
    controller: 'AttendanceCtrl'
  });

})
.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('smartattendance');
});

var utils = angular.module('scouts.utils', []);