'use strict';

angular.module('app')
    .config(['$httpProvider', '$stateProvider', function ($httpProvider, $stateProvider) {
        $stateProvider
            .state('profile', {
                parent: 'site',
                url: '/profile',
                data: {
                    roles: ['user']
                },
                views: {
                    'content@': {
                        templateUrl: 'app/profile/profile.html',
                        controller: 'ProfileController as profile'
                    }
                }
            });
    }]);
