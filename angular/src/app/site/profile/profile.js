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
                resolve: {
                    data: ['$http', 'API',
                        function ($http, API) {
                            return $http.get(API.PROFILE)
                                .then(function (response) {
                                    return response.data;
                                });
                        }
                    ]
                },
                views: {
                    'content': {
                        templateUrl: 'app/site/profile/profile.html',
                        controller: 'SiteProfileController as profile'
                    }
                }
            });
    }]);
