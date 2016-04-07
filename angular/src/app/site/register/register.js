'use strict';

angular.module('app.site')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('site.register', {
                parent: 'site',
                url: '/register',
                data: {
                    roles: []
                },
                views: {
                    'content': {
                        templateUrl: 'app/site/register/register.html',
                        controller: 'SiteRegisterController as register'
                    }
                }
            });
    }]);
