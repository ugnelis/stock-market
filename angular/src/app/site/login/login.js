'use strict';

angular.module('app.site')
    .config(['$httpProvider', '$stateProvider', function ($httpProvider, $stateProvider) {
        $stateProvider
            .state('login', {
                parent: 'site',
                url: '/login',
                data: {
                    roles: []
                },
                views: {
                    'content': {
                        templateUrl: 'app/site/login/login.html',
                        controller: 'SiteLoginController as login'
                    }
                }
            });
    }]);
