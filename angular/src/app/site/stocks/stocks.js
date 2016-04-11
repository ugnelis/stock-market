'use strict';

angular.module('app.site')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('site.stocks', {
                parent: 'site',
                url: '/stocks',
                data: {
                    roles: []
                },
                resolve: {
                    resolvedStocks: ['stocks',
                        function (stocks) {
                            return stocks.getIndex();
                        }
                    ]
                },
                views: {
                    'content': {
                        templateUrl: 'app/site/stocks/stocks.html',
                        controller: 'SiteStocksController as stocks'
                    }
                }
            });
    }]);
