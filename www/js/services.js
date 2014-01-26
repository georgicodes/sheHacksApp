angular.module('sheHacksApp.services', ['LocalStorageModule', 'DeferredUpdateModule', 'ngResource', 'sheHacksApp.configuration'])

    .factory('MenuService', function ($resource, API_END_POINT, localStorageService, deferredUpdateService) {
        return {
            getMenu: function () {
                var resource = $resource(API_END_POINT + '/menuItems', {
                    query: { method: 'GET', isArray: true }
                });

                return queryAndUpdateLocalStorage(localStorageService, deferredUpdateService, 'menuItems', resource);
            }
        }
    })

    .factory('ProgramService', function () {
        var programDays = [
            {"date": "FRIDAY 21st MARCH, 2014", "program": [
                {"title": "Guest Arrival & Registration", "time": "18:00"},
                {"title": "Welcome & Lightening Talks", "time": "18:30"},
                {"title": "Pitches & Group Formation", "time": "19:00"},
                {"title": "Dinner", "time": "20:00"},
                {"title": "Start Hacking", "time": "20:00"},
                {"title": "Home Time", "time": "24:00"}
            ]},
            {"date": "SATURDAY 22nd MARCH, 2014", "program": [
                {"title": "Coffee & Hacking", "time": "09:00"},
                {"title": "Morning Tea", "time": "10:00"},
                {"title": "Lunch", "time": "12:00"},
                {"title": "Team Presentations", "time": "17:00"},
                {"title": "Judging and Prizes", "time": "17:30"},
                {"title": "Party Time @ Nearby Bar", "time": "18:00"}
            ]}
        ];

        return {
            all: function () {
                return programDays;
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
