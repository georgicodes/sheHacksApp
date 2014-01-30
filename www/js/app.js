var sideMenuApp = angular.module('sheHacksApp', ['ionic', 'ngRoute', 'sheHacksApp.controllers', 'sheHacksApp.services', 'sheHacksApp.configuration']);

sideMenuApp.config(function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
});

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
        .otherwise({ redirectTo: '/program' });
}]);

sideMenuApp.run(function($rootScope) {

    document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);

    function onOnline() {
        console.log("just received an online event");
        $rootScope.$apply(function() {
            $rootScope.noNetwork = false;
        });
    }

    function onOffline() {
        console.log("just received an offline event");
        $rootScope.$apply(function() {
            $rootScope.noNetwork = true;
        });
    }

});