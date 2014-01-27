angular.module('sheHacksApp.controllers', [])

    .controller('MenuController', function ($scope, Platform, MenuService) {
        $scope.list = MenuService.all();

        $scope.$on('$viewContentLoaded', function () {
            $scope.noNetwork = !hasNetworkConnectivity();
        });

        $scope.openLeft = function () {
            $scope.sideMenuController.toggleLeft();
        };

        $scope.closeMenu = function () {
            $scope.sideMenuController.close();
        }

        Platform.ready(function () {
            // hide the status bar using the StatusBar plugin
            StatusBar.hide();
        });

    })

    .controller('VenueController', function ($scope) {
        $scope.title = "Venue & Map";
        $scope.noNetwork = false;

        <!-- there were issues calling google.maps.event.addDomListener(window, 'load', initialize); so I am using this way of calling init instead -->
        $scope.$on('$viewContentLoaded', function () {
            // We need to check for connection status before attempting to connect to the google maps API otherwise bad things happen
            if (hasNetworkConnectivity()) {
                init();
            } else {
                $scope.noNetwork = true;
                console.log("No network detected, cannot initialize map")
            }
        });

        function init() {
            console.log("initializing google maps")

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

        $scope.centerOnMe = function () {
            if (!$scope.map) {
                console.log("cannot find map")
                return;
            }

            navigator.geolocation.getCurrentPosition(function (pos) {
                $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            });
        };

    })

    .controller('RegistrationController', function ($scope, SponsorsService) {
        $scope.title = "Registration";
    })

    .controller('SponsorsController', function ($scope, SponsorsService) {
        $scope.title = "Sponsors";

        SponsorsService.getSponsors().then(function (data) {
            $scope.sponsors = data;
        });

        // opens links in browser instead of on top of app
        $scope.openLink = function (link) {
            console.log(link);
            window.open('http://' + link, '_system');
        }
    })

    .controller('ProgramController', function ($scope, ProgramService) {
        $scope.title = "Program";

        ProgramService.getProgram().then(function (data) {
            $scope.schedule = data;
        });
    })

    .controller('PrizesController', function ($scope, PrizesService) {
        $scope.title = "Prize Categories";
        PrizesService.getPrizes().then(function (data) {
            $scope.prizes = data;
        });
    })

    .controller('AboutController', function ($scope, CreditsService) {
        $scope.title = "About";

        CreditsService.getCredits().then(function (data) {
            $scope.people = data;
        })
    });

// TODO: FIX THIS :'(
// Unfortunately navigator.onLine is not implemented properly in many browsers. So basically it lies to you...
// I have tested it on iOS and it still returns TRUE for airplane mode.
// The PhoneGap APIs navigator.connection.type is also faulty for airplane mode (returns "cellular")
// So it seems there is no great way of detecting no network access and this solution doesn't work for me on airplane mode still...
function hasNetworkConnectivity() {
    console.log("navigator.onLine " + navigator.onLine);
    return navigator.onLine;
}
