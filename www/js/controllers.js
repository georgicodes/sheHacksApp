angular.module('sheHacksApp.controllers', [])

    .controller('MenuController', function ($scope, MenuService) {
        // "MenuService" is a service returning mock data (services.js)
        $scope.list = MenuService.all();

        $scope.openLeft = function () {
            $scope.sideMenuController.toggleLeft();
        };

        $scope.closeMenu = function () {
            $scope.sideMenuController.close();
        }
    })

    .controller('VenueController', function ($scope) {
        $scope.title = "Venue & Map";
    })

    .controller('SponsorsController', function ($scope, SponsorsService) {
        $scope.title = "Sponsors";

        $scope.sponsors = SponsorsService.all();
    })

    .controller('ProgramController', function ($scope, ProgramService) {
        $scope.title = "Program";

        $scope.schedule = ProgramService.all();
    });
