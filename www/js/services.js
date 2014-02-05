angular.module('sheHacksApp.services', ['LocalStorageModule', 'ngResource', 'sheHacksApp.configuration'])

    .factory('MenuService', function () {

        var menuItems = [
            { text: 'Program', iconClass: 'icon ion-clipboard', colour: "candy-pink-bg", link: '#/program'},
            { text: 'Venue & Map', iconClass: 'icon ion-map', colour: "candy-purple-bg", link: '#/venue'},
            { text: 'Twitter', iconClass: 'icon ion-speakerphone', colour: "candy-blue-bg", link: '#/twitter'},
            { text: 'Prizes', iconClass: 'icon ion-icecream', colour: "candy-green-bg", link: '#/prizes'},
            { text: 'Sponsors', iconClass: 'icon ion-heart', colour: "candy-orange-bg", link: '#/sponsors'},
            { text: 'About', iconClass: 'icon ion-woman', colour: "candy-yellow-bg", link: '#/about'}
        ];

        return {
            all: function () {
                return menuItems;
            }
        }
    })

    .factory('ProgramService', function ($resource, API_END_POINT, localStorageService, $q, $rootScope) {
        return {
            getProgram: function () {
                var resource = $resource(API_END_POINT + '/program', {
                    query: { method: 'GET', isArray: true }
                });

                return queryAndUpdateLocalStorage(localStorageService, 'program', resource, $q, $rootScope);
            }
        }
    })

    .factory('SponsorsService', function ($resource, API_END_POINT, localStorageService, $q, $rootScope) {
        return {
            getSponsors: function() {
                var resource = $resource(API_END_POINT + '/sponsors', {
                    query: { method: 'GET', isArray: true }
                });

                return queryAndUpdateLocalStorage(localStorageService, 'sponsors', resource, $q, $rootScope);
            }
        }
    })

    .factory('PrizesService', function ($resource, API_END_POINT, localStorageService, $q, $rootScope) {
        return {
            getPrizes: function () {
                var resource = $resource(API_END_POINT + '/prizes', {
                    query: { method: 'GET', isArray: true }
                });

                return queryAndUpdateLocalStorage(localStorageService, 'prizes', resource, $q, $rootScope);
            }
        }
    })

    .factory('CreditsService', function ($resource, API_END_POINT, localStorageService, $q, $rootScope) {
        return {
            getCredits: function () {
                var resource = $resource(API_END_POINT + '/credits', {
                    query: { method: 'GET', isArray: true }
                });

                return queryAndUpdateLocalStorage(localStorageService, 'credits', resource, $q, $rootScope);
            }
        }
    })

    .factory('EventsService', function ($resource, API_END_POINT, localStorageService, $q, $rootScope) {
        return {
//            getSheHacksEvent: function () {
//                var resource = $resource(API_END_POINT + '/events:EventId', {
//                    EventId: 'SheHacks'
//                }, {
//                    query: { method: 'GET', isArray: true }
//                });
//
//                return queryAndUpdateLocalStorage(localStorageService, deferredUpdateService, 'events', resource);
//            },
            getEvents: function () {
                var resource = $resource(API_END_POINT + '/events', {
                    query: { method: 'GET', isArray: true }
                });

                return queryAndUpdateLocalStorage(localStorageService, 'events', resource, $q, $rootScope);
            }
        }
    })
;


function queryAndUpdateLocalStorage(localStorageService, storageName, resource, $q, $rootScope) {
    var deferred = $q.defer();
    setTimeout(function() {

        $rootScope.$apply(function() {
            var response = localStorageService.get(storageName);
            deferred.notify(response);

            resource.query(function (success) {
                localStorageService.add(storageName, success);
                deferred.resolve(success);
            }, function(error) {
                deferred.reject(error);
            });
        });
    });
    return deferred.promise;
}
