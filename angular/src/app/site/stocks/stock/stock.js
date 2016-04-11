'use strict';

angular.module('app.site')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('site.stocks.unit', {
                parent: 'site',
                url: '/stocks/:symbol',
                data: {
                    roles: []
                },
                resolve: {
                    resolvedStock: ['$stateParams', 'stocks',
                        function ($stateParams, stocks) {
                            var result = stocks.getStock($stateParams.symbol);
                            if (Array.isArray(result))
                                return result[0];
                            return result;
                        }
                    ],
                    resolvedHistory: ['$stateParams', 'stocks',
                        function ($stateParams, stocks) {
                            return stocks.getStockHistory($stateParams.symbol);
                        }
                    ],
                    resolvedTransactions: ['$stateParams', 'stocks',
                        function ($stateParams, stocks) {
                            return stocks.getTransactions($stateParams.symbol);
                        }
                    ]
                },
                views: {
                    'content': {
                        templateUrl: 'app/site/stocks/stock/stock.html',
                        controller: 'SiteStockController as stock'
                    }
                }
            });
    }]);
