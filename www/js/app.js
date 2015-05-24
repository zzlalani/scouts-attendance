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
    templateUrl: '../app/view/index.html',
    controller: 'IndexCtrl'
  })
  .state('attendance', {
    url: '/attendance',
    templateUrl: '../app/view/attendance.html',
    controller: 'AttendanceCtrl'
  })
  .state('viewattendance', {
    url: '/viewattendance',
    templateUrl: '../app/view/viewattendance.html',
    controller: 'ViewAttendanceCtrl'
  })
  .state('attendancedate', {
    url: '/attendancedate/:date',
    templateUrl: '../app/view/attendance.html',
    controller: 'AttendanceCtrl'
  });

})
.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('smartattendance');
});