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
                    index: ['profile',
                        function (profile) {
                            return profile.getIndex();
                        }
                    ],
                    inventory: ['profile',
                        function (profile) {
                            return profile.getInventory();
                        }
                    ],
                    account: ['profile',
                        function (profile) {
                            return profile.getAccount();
                        }
                    ],
                    orders: ['profile',
                        function (profile) {
                            return profile.getOrders();
                        }
                    ],
                    stocks: ['$stateParams', 'stock', 'inventory',
                        function ($stateParams, stock, inventory) {
                            var symbols = inventory.map(function (array) {
                                return array.symbol;
                            });

                            if (symbols.toString() == "")
                                return [];

                            return stock.getStock(symbols.toString());
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
