'use strict';

angular.module('app.site')
    .config(['$httpProvider', '$stateProvider', function ($httpProvider, $stateProvider) {
        $stateProvider
            .state('site.profile', {
                parent: 'site',
                url: '/profile',
                data: {
                    roles: ['user']
                },
                resolve: {
                    resolvedIndex: ['profile',
                        function (profile) {
                            return profile.getIndex();
                        }
                    ],
                    resolvedInventory: ['profile',
                        function (profile) {
                            return profile.getInventory();
                        }
                    ],
                    resolvedAccount: ['profile',
                        function (profile) {
                            return profile.getAccount();
                        }
                    ],
                    resolvedOrders: ['profile',
                        function (profile) {
                            return profile.getOrders();
                        }
                    ],
                    resolvedStocks: ['$stateParams', 'stocks', 'resolvedInventory',
                        function ($stateParams, stocks, resolvedInventory) {
                            var symbols = resolvedInventory.map(function (array) {
                                return array.symbol;
                            });

                            if (symbols.toString() == "")
                                return [];

                            return stocks.getStock(symbols.toString());
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
