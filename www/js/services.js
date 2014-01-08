angular.module('sheHacksApp.services', [])

    .factory('MenuService', function () {

        var menuItems = [
            { text: 'Program', iconClass: 'icon ion-clipboard', colour: "candy-pink", link: '#/program'},
            { text: 'Venue & Map', iconClass: 'icon ion-map', colour: "candy-lav", link: '#/venue'},
            { text: 'Prizes', iconClass: 'icon ion-icecream', colour: "candy-blue", link: '#/prizes'},
            { text: 'Sponsors', iconClass: 'icon ion-heart', colour: "candy-green", link: '#/sponsors'},
            { text: 'Thanks', iconClass: 'icon ion-woman', colour: "candy-yellow", link: '#/about'}
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
            {"date": "Friday 21st March, 2014", "program": [
                {"title": "Guest Arrival Registration", "time": "6pm", iconClass: '', colour: "candy-"},
                {"title": "Welcome & Lightening Talks", "time": "6.30pm", iconClass: '', colour: "candy-" },
                {"title": "Pitches & Group Formation", "time": "7pm", iconClass: '', colour: "candy-"},
                {"title": "Dinner", "time": "8pm", iconClass: '', colour: "candy-"},
                {"title": "Start Hacking", "time": "9pm - 12am", iconClass: '', colour: "candy-"}
            ]},
            {"date": "Saturday 22nd March, 2014", "program": [
                {"title": "Coffee & Hacking", "time": "8am", iconClass: '', colour: "candy-"},
                {"title": "Morning Tea", "time": "10am", iconClass: '', colour: "candy-"},
                {"title": "Lunch", "time": "12pm", iconClass: '', colour: "candy-"},
                {"title": "30 minute warning till Pitch Time", "time": "4pm", iconClass: '', colour: "candy-"},
                {"title": "Project Pitches", "time": "4.30pm", iconClass: '', colour: "candy-"},
                {"title": "Judging and Prizes", "time": "5.30pm", iconClass: '', colour: "candy-"},
                {"title": "Party Time", "time": "6pm - Late", iconClass: '', colour: "candy-"}
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
            { name: 'Atlassian', src: 'img/google.jpg', link: 'www.atlassian.com'},
            { name: 'Github', src: 'img/google.jpg', link: 'www.github.com'},
            { name: 'Mi9', src: 'img/google.jpg', link: 'www.google.com.au'}
        ];

        return {
            all: function () {
                return sponsors;
            }
        }

    })

    .factory('PrizesService', function () {
        var prizes = [
            { name: 'Best Use of Search', desc: 'sponsored by Google'},
            { name: 'Best Use of Social Media', desc: 'sponsored by Mi9'},
            { name: 'Peoples Choice', desc: 'as voted by audience'}
        ];

        return {
            all: function () {
                return prizes;
            }
        }

    })
;
