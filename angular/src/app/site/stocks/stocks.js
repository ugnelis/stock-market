'use strict';

angular.module('app.site')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('stocks', {
                parent: 'site',
                url: '/stocks',
                data: {
                    roles: []
                },
                resolve: {
                    data: ['stock',
                        function (stock) {
                            return stock.getIndex();
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
