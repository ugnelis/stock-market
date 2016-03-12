'use strict';

angular.module('app.site')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('home', {
                parent: 'site',
                url: '/',
                data: {
                    roles: []
                },
                views: {
                    'content': {
                        templateUrl: 'app/site/home/home.html',
                        controller: 'SiteHomeController as home'
                    }
                }
            });
    }])

    // test data
    .factory('HomeData', function () {
        return {
            title: "Home",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        };
    });
