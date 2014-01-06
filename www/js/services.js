angular.module('sheHacksApp.services', [])

    .factory('MenuService', function () {

        var menuItems = [
            { text: 'Venue & Map', iconClass: 'icon ion-map', link: '#/venue'},
            { text: 'Program', iconClass: 'icon ion-ios7-calendar', link: '#/program'},
            { text: 'Sponsors', iconClass: 'icon ion-star', link: '#/sponsors'}
        ];

        return {
            all: function () {
                return menuItems;
            }
        }
    })

    .factory('ProgramService', function () {
        var programDays = [
            {"date": "Friday 20th March, 2014", "program": [
                {"title": "Arrival & Guest Registration", "time": "6pm"},
                {"title": "Welcome & Lightening Talks", "time": "7pm"}
            ]},
            {"date": "Saturday 21st March, 2014", "program": [
                {"title": "Breakfast & Coffee", "time": "8pm"},
                {"title": "Welcome & Lightening Talks", "time": "7pm"},
                {"title": "Welcome & Lightening Talks", "time": "8pm"},
                {"title": "Welcome & Lightening Talks", "time": "9pm"},
                {"title": "Welcome & Lightening Talks", "time": "10pm"}
            ]}
        ];

        return {
            all: function () {
                return programDays;
            }
        }

    })


    .factory('SponsorsService', function () {
        var sponsors = [
            { name: 'Google', src: 'img/google.jpg', link: 'www.google.com.au'},
            { name: 'Atlassian', src: 'img/atlassian.jpg', link: 'www.atlassian.com'},
            { name: 'Github', src: 'img/atlassian.jpg', link: 'www.github.com'},
            { name: 'Mi9', src: 'img/atlassian.jpg', link: 'www.google.com.au'}
        ];

        return {
            all: function () {
                return sponsors;
            }
        }

    })
;
