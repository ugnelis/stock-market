'use strict';

angular.module('app.site')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('site.about', {
                parent: 'site',
                url: '/about',
                data: {
                    roles: []
                },
                resolve: {
                    data: ['pages',
                        function (pages) {
                            return pages.getPage('about');
                        }
                    ]
                },
                views: {
                    'content': {
                        templateUrl: 'app/site/about/about.html',
                        controller: 'SiteAboutController as about'
                    }
                }
            });
    }]);
