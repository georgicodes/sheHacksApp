angular.module('sheHacksApp.services', ['ngResource', 'sheHacksApp.configuration'])

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

//    TODO: gk fix colour
    .factory('ProgramService', function () {
        var programDays = [
            {"date": "FRIDAY 21st MARCH, 2014", "program": [
                {"title": "Guest Arrival & Registration", "time": "18:00"},
                {"title": "Welcome & Lightening Talks", "time": "18:30"},
                {"title": "Pitches & Group Formation", "time": "19:00"},
                {"title": "Dinner", "time": "20:00", iconClass: ''},
                {"title": "Start Hacking", "time": "20:00-<br>24:00"}
            ]},
            {"date": "SATURDAY 22nd MARCH, 2014", "program": [
                {"title": "Coffee & Hacking", "time": "09:00"},
                {"title": "Morning Tea", "time": "10:00"},
                {"title": "Lunch", "time": "12:00"},
                {"title": "30 Minute Warning Till Pitches", "time": "16:00"},
                {"title": "Team Pitches", "time": "16:30"},
                {"title": "Judging and Prizes", "time": "15:30"},
                {"title": "Party Time", "time": "18:00-<br>Late"}
            ]}
        ];

        return {
            all: function () {
                return programDays;
            }
        }

    })

    .factory('SponsorsService', function ($resource, API_END_POINT) {
        return $resource(API_END_POINT + '/sponsors', {
            query: { method: 'GET', isArray: true }
        }) ;
    })

    .factory('PrizesService', function () {
        var prizes = [
            { name: 'Best Use of Search', desc: 'sponsored by Google'},
            { name: 'Best Use of Social Media', desc: 'sponsored by Microsoft'},
            { name: 'Peoples Choice', desc: 'as voted by audience'}
        ];

        return {
            all: function () {
                return prizes;
            }
        }

    })

    .factory('CreditsService', function () {
        var people = [
            { name: 'Georgi Knox', desc: 'App Developer, Event Organiser'},
            { name: 'Denise Fernandez', desc: 'App Developer, Event Organiser'},
            { name: 'Sera Prince McGill', desc: 'Event Organiser'},
            { name: 'Peggy Kuo', desc: 'Event Organiser'},
            { name: 'Kris Howard', desc: 'Event Organiser'}
        ];

        return {
            all: function () {
                return people;
            }
        }

    })
;
