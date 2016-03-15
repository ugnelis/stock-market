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
    }]);
