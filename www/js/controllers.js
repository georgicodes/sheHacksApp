angular.module('sheHacksApp.controllers', [])

    .controller('MenuController', function ($scope, Platform, MenuService) {
        // "MenuService" is a service returning mock data (services.js)
        $scope.list = MenuService.all();

        $scope.openLeft = function () {
            $scope.sideMenuController.toggleLeft();
        };

        $scope.closeMenu = function () {
            $scope.sideMenuController.close();
        }

        Platform.ready(function() {
            // hide the status bar using the StatusBar plugin
            StatusBar.hide();
        });
    })

    .controller('VenueController', function ($scope) {
        $scope.title = "Venue & Map";

        <!-- there were issues calling google.maps.event.addDomListener(window, 'load', initialize); so I am using this way of calling init instead -->
        $scope.$on('$viewContentLoaded', function() {
            init();
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

            var map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions);

            var marker = new google.maps.Marker({
                position: googlePos,
                map: map,
                title: 'Google Sydney'
            });

            var infowindow = new google.maps.InfoWindow({
                content: "<p style='height: 40px'>Level 5, Google Sydney</p>"
            });

            // Stop the side bar from dragging when mousedown/tapdown on the map
            google.maps.event.addDomListener(document.getElementById('map-canvas'), 'mousedown', function(e) {
                e.preventDefault();
                return false;
            });

            $scope.map = map;
            infowindow.open(map,marker);
        };


        $scope.centerOnMe = function() {
            if(!$scope.map) {
                console.log("cannot find map")
                return;
            }

//            $scope.loading = Loading.show({
//                content: 'Getting current location...',
//                showBackdrop: false
//            });

            navigator.geolocation.getCurrentPosition(function(pos) {
                $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
//                $scope.loading.hide();
            }, function(error) {
                console.log('Unable to get location: ' + error.message);
            });
        };

    })

    .controller('RegistrationController', function ($scope, SponsorsService) {
        $scope.title = "Registration";
    })

    .controller('SponsorsController', function ($scope, SponsorsService) {
        $scope.title = "Sponsors";

        $scope.sponsors = SponsorsService.all();

        // opens links in browser instead of on top of app
        $scope.openLink = function(link) {
            console.log(link);
            window.open('http://'+link, '_system');
        }
    })

    .controller('ProgramController', function ($scope, ProgramService) {
        $scope.title = "Program";

        $scope.schedule = ProgramService.all();
    })

    .controller('PrizesController', function ($scope, PrizesService) {
        $scope.title = "Prize Categories";

        $scope.prizes = PrizesService.all();
    })

    .controller('AboutController', function ($scope, CreditsService) {
        $scope.title = "About";

        $scope.people = CreditsService.all();
    });
