'use strict';

angular.module('app.site', [
        'ngAnimate',
        'chart.js'
    ])
    .config(['$stateProvider', 'ChartJsProvider', function ($stateProvider, ChartJsProvider) {
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

        ChartJsProvider.setOptions({
            colours: ['#FF5252', '#FF8A80'],
            responsive: true
        });
        // Configure all line charts
        ChartJsProvider.setOptions('Line', {
            datasetFill: false
        });
    }]);
