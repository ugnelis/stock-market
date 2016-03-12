'use strict';

angular.module('app.site')
    .config(['$httpProvider', '$stateProvider', function ($httpProvider, $stateProvider) {
        $stateProvider
            .state('profile', {
                parent: 'site',
                url: '/profile',
                data: {
                    roles: ['user']
                },
                views: {
                    'content': {
                        templateUrl: 'app/site/profile/profile.html',
                        controller: 'SiteProfileController as profile'
                    }
                }
            });
    }]);
