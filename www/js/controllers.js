angular.module('sheHacksApp.controllers', ['LocalStorageModule'])

    .controller('MenuController', function ($scope, $rootScope, Platform, MenuService) {
        $scope.list = MenuService.all();

        $scope.openLeft = function () {
            $scope.sideMenuController.toggleLeft();
        };

        $scope.closeMenu = function () {
            $scope.sideMenuController.close();
        }

        Platform.ready(function () {
            // hide the status bar using the StatusBar plugin
            try {
                StatusBar.hide();
            } catch (e) {
                console.log("Cannot find StatusBar")
            }
        });

    })

    .controller('VenueController', function ($scope, $rootScope, EventsService) {
        $scope.title = "Venue & Map";

        EventsService.getEvents().then(function (success) {
            $scope.event = success[0];
            $scope.firstDay = $scope.event.eventDays[0];
            $scope.secondDay = $scope.event.eventDays[1];
        }, function (error) {
            console.log("error: " + error);
            $scope.updateStatus = "Unable to retrieve latest data";
        }, function (update) {
            $scope.event = update[0];
            $scope.firstDay = $scope.event.eventDays[0];
            $scope.secondDay = $scope.event.eventDays[1];
        });

        $rootScope.$watch('noNetwork', function() {
            console.log("watch fired");
            toggleMapVisibility();
        });

        <!-- there were issues calling google.maps.event.addDomListener(window, 'load', initialize); so I am using this way of calling init instead -->
        $scope.$on('$viewContentLoaded', function () {
            toggleMapVisibility();
        });

        function toggleMapVisibility() {
            // We need to check for connection status before attempting to connect to the google maps API otherwise bad things happen
            if (!$rootScope.noNetwork) {
                console.log("Network detected, initializing map")
                init();
            } else {
                console.log("No network detected, cannot initialize map")
            }
        }

        function init() {
            var googlePos = new google.maps.LatLng(-33.8665433, 151.1956316);

            //TODO: fix map centering to allow for infoWindow
            var mapOptions = {
                center: googlePos,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

            var marker = new google.maps.Marker({
                position: googlePos,
                map: map,
                title: 'Google Sydney'
            });

            var infowindow = new google.maps.InfoWindow({
                content: "<p style='height: 40px'>Google Sydney</p>"
            });

            // Stop the side bar from dragging when mousedown/tapdown on the map
            google.maps.event.addDomListener(document.getElementById('map-canvas'), 'mousedown', function (e) {
                e.preventDefault();
                return false;
            });

            $scope.map = map;
//            infowindow.open(map, marker);
        };

    })

    .controller('SponsorsController', function ($scope, SponsorsService) {
        $scope.title = "Sponsors";

        SponsorsService.getSponsors().then(function (success) {
            $scope.sponsors = success;
        }, function (error) {
            console.log("error: " + error);
            $scope.updateStatus = "Unable to retrieve latest data";
        }, function (update) {
            $scope.sponsors = update;
        });

        // opens links in browser instead of on top of app
        $scope.openLink = function (link) {
            console.log(link);
            window.open('http://' + link, '_system');
        };

        $scope.onRefresh = refreshPageContent(SponsorsService.getSponsors, $scope, "sponsors");
    })

    .controller('ProgramController', function ($scope, ProgramService) {
        $scope.title = "Program";

        ProgramService.getProgram().then(function (success) {
            $scope.schedule = success;
        }, function (error) {
            $scope.updateStatus = "Unable to retrieve latest data";
        }, function (update) {
            $scope.schedule = update;
        });

        $scope.onRefresh = refreshPageContent(ProgramService.getProgram, $scope, "schedule");
    })

    .controller('PrizesController', function ($scope, PrizesService) {
        $scope.title = "Prize Categories";
        PrizesService.getPrizes().then(function (data) {
            $scope.prizes = data;
        }, function (error) {
            $scope.updateStatus = "Unable to retrieve latest data";
        }, function (update) {
            $scope.prizes = update;
        });

        $scope.onRefresh = refreshPageContent(PrizesService.getPrizes, $scope, "prizes");

    })

    .controller('AboutController', function ($scope, CreditsService) {
        $scope.title = "About";

        CreditsService.getCredits().then(function (data) {
            $scope.people = data;
        }, function (error) {
            $scope.updateStatus = "Unable to retrieve latest data";
        }, function (update) {
            $scope.people = update;
        });

        $scope.onRefresh = refreshPageContent(CreditsService.getCredits, $scope, "people");
    });

function refreshPageContent(promise, $scope, collectionName) {
    return function() {
        console.log("in refresh page content") ;
        promise().then(function(success) {
            $scope[collectionName] = success;
        });
        $scope.$broadcast('scroll.refreshComplete');
    };
}