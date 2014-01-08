var sideMenuApp = angular.module('sheHacksApp', ['ionic', 'ngRoute', 'sheHacksApp.controllers', 'sheHacksApp.services']);

sideMenuApp.config(function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

sideMenuApp.config(['$routeProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/venue', {
            controller: 'VenueController',
            templateUrl: 'templates/venue.html'
        })
        .when('/sponsors', {
            controller: 'SponsorsController',
            templateUrl: 'templates/sponsors.html'
        })
        .when('/program', {
            controller: 'ProgramController',
            templateUrl: 'templates/program.html'
        })
        .when('/prizes', {
            controller: 'PrizesController',
            templateUrl: 'templates/prizes.html'
        })
        .when('/about', {
            controller: 'AboutController',
            templateUrl: 'templates/about.html'
        })
        .when('/registration', {
            controller: 'RegistrationController',
            templateUrl: 'templates/registration.html'
        })
        .otherwise({ redirectTo: '/program' });
}]);