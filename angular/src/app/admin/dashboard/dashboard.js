'use strict';

angular.module('app.admin')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('admin.dashboard', {
                parent: 'admin',
                url: '/dashboard',
                resolve: {
                    resolvedUsers: ['users',
                        function (users) {
                            return users.getIndex();
                        }
                    ],
                    resolvedOrders: ['orders',
                        function (orders) {
                            return orders.getIndex();
                        }
                    ]
                },
                views: {
                    'content': {
                        templateUrl: 'app/admin/dashboard/dashboard.html',
                        controller: 'AdminDashboardController as dashboard'
                    }
                }
            });
    }]);
