'use strict';

angular.module('app.site', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('site', {
                abstract: true,
                cache: false,

                resolve: {
                    authorize: ['auth',
                        function (auth) {
                            return auth.authorize();
                        }
                    ]
                },
                views: {
                    "@": {
                        templateUrl: 'app/site/site.html'
                    },
                    'navbar@site': {
                        templateUrl: 'app/site/layouts/navbar/navbar.html',
                        controller: 'SiteNavbarController as navbar'
                    },
                    'footer@site': {
                        templateUrl: 'app/site/layouts/footer/footer.html',
                        controller: 'SiteFooterController as footer'
                    }
                }
            });
    }]);
