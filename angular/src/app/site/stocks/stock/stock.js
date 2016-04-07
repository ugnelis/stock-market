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
                    data: ['$stateParams', 'stock',
                        function ($stateParams, stock) {
                            var result = stock.getStock($stateParams.symbol);
                            if (Array.isArray(result))
                                return result[0];
                            return result;
                        }
                    ],
                    history: ['$stateParams', 'stock',
                        function ($stateParams, stock) {
                            return stock.getStockHistory($stateParams.symbol);
                        }
                    ],
                    transactions: ['$stateParams', 'stock',
                        function ($stateParams, stock) {
                            return stock.getTransactions($stateParams.symbol);
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
