angular.module('sheHacksApp.services', ['LocalStorageModule', 'DeferredUpdateModule', 'ngResource', 'sheHacksApp.configuration'])

    .factory('MenuService', function () {

        var menuItems = [
            { text: 'Program', iconClass: 'icon ion-clipboard', colour: "candy-pink-bg", link: '#/program'},
            { text: 'Venue & Map', iconClass: 'icon ion-map', colour: "candy-purple-bg", link: '#/venue'},
            { text: 'Prizes', iconClass: 'icon ion-icecream', colour: "candy-blue-bg", link: '#/prizes'},
            { text: 'Sponsors', iconClass: 'icon ion-heart', colour: "candy-green-bg", link: '#/sponsors'},
            { text: 'About', iconClass: 'icon ion-woman', colour: "candy-yellow-bg", link: '#/about'}
        ];

        return {
            all: function () {
                return menuItems;
            }
        }
    })

    .factory('ProgramService', function ($resource, API_END_POINT, localStorageService, deferredUpdateService) {
        return {
            getProgram: function () {
                var resource = $resource(API_END_POINT + '/program', {
                    query: { method: 'GET', isArray: true }
                });

                return queryAndUpdateLocalStorage(localStorageService, deferredUpdateService, 'program', resource);
            }
        }
    })

    .factory('SponsorsService', function ($resource, API_END_POINT, localStorageService, deferredUpdateService) {
        return {
            getSponsors: function () {
                var resource = $resource(API_END_POINT + '/sponsors', {
                    query: { method: 'GET', isArray: true }
                });

                return queryAndUpdateLocalStorage(localStorageService, deferredUpdateService, 'sponsors', resource);
            }
        }
    })

    .factory('PrizesService', function ($resource, API_END_POINT, localStorageService, deferredUpdateService) {
        return {
            getPrizes: function () {
                var resource = $resource(API_END_POINT + '/prizes', {
                    query: { method: 'GET', isArray: true }
                });

                return queryAndUpdateLocalStorage(localStorageService, deferredUpdateService, 'prizes', resource);
            }
        }
    })

    .factory('CreditsService', function ($resource, API_END_POINT, localStorageService, deferredUpdateService) {
        return {
            getCredits: function () {
                var resource = $resource(API_END_POINT + '/credits', {
                    query: { method: 'GET', isArray: true }
                });

                return queryAndUpdateLocalStorage(localStorageService, deferredUpdateService, 'credits', resource);
            }
        }
    })
;

function queryAndUpdateLocalStorage(localStorageService, deferredUpdateService, storageName, resource) {
    // here we always query the RESTful service, but if we already have values in
    // storage they are displayed first, then the storage is updated when the RESTful request returns
    var deferred, promise;
    deferred = deferredUpdateService.defer();
    promise = deferred.promise;

    resource.query(function (response) {
        console.log("querying REST resource")
        localStorageService.add(storageName, response);
        deferred.resolve(response);
    });

    var response = localStorageService.get(storageName);
    if (response != undefined) {
        console.log("querying storage")
        deferred.resolve(response);
    }

    return promise;
}
