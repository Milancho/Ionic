// Ionic Starter App

var app = angular.module('starter', ['ionic', 'starter.controllers', 'ion-autocomplete', 'ionic-datepicker'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }


    });
})

.config(function($stateProvider, $urlRouterProvider) {//, ionicDatePickerProvider) {

    // optional config for ionic-datepicker
    // https://github.com/rajeshwarpatlolla/ionic-datepicker
    /*var datePickerObj = {
        inputDate: new Date(),
        setLabel: 'Set',
        todayLabel: 'Today',
        closeLabel: 'Close',
        mondayFirst: false,
        weeksList: ["S", "M", "T", "W", "T", "F", "S"],
        monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
        templateType: 'popup',
        from: new Date(2012, 8, 1),
        to: new Date(2018, 8, 1),
        showTodayButton: true,
        dateFormat: 'dd MMMM yyyy',
        closeOnSelect: false,
        disableWeekdays: [6],
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);*/

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    });

    $stateProvider.state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            }
        }
    });

    $stateProvider.state('app.dashboard', {
        url: '/dashboard',
        views: {
            'menuContent': {
                templateUrl: 'templates/dashboard.html',
                controller: 'DashboardCtrl'
            }
        }
    });

   $stateProvider.state('app.list', {
        url: '/list/:entity',
        views: {
            'menuContent': {
                templateUrl: 'templates/list.html',
                controller: 'ListCtrl'
            }
        },
        cache: false
    });

   $stateProvider.state('app.edit', {
        url: '/edit/:params',
        views: {
            'menuContent': {
                templateUrl: 'templates/edit.html',
                controller: 'EditCtrl'
            }
        },
        cache: false
    });

    // Default route
    $urlRouterProvider.otherwise('/app/login');
});
