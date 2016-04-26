"use strict";

angular.module('app')
    .factory('orders', ['$http', '$state', '$uibModal', 'principal', 'alert', 'API',
        function ($http, $state, $uibModal, principal, alert, API) {
            var orders = {
                getIndex: function () {
                    var promise = $http.get(API.ORDERS)
                        .error(function (response) {
                            alert.add('danger', response.error);
                        })
                        .then(function (response) {
                            return response.data;
                        });
                    return promise;
                },
                submit: function (data) {
                    return $http({
                        method: 'POST',
                        url: API.ORDERS,
                        data: JSON.stringify(data),
                        ignoreErrors: true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .error(function (response) {
                            alert.add('danger', response.error);
                        })
                        .then(function (response) {
                            alert.add('success', response.data.success);
                        });
                },
                remove: function (id) {
                    var promise = $http.delete(API.ORDERS + id)
                        .then(function (response) {
                            return response.data;
                        });
                    return promise;
                },
                openForm: function (side, symbol, order) {
                    if (principal.isAuthenticated())
                        $uibModal.open({
                            animation: true,
                            templateUrl: 'app/common/orders/orders.html',
                            controller: 'OrdersController as orders',
                            resolve: {
                                data: ['stocks',
                                    function (stocks) {
                                        return stocks.getIndex();
                                    }
                                ],
                                items: [
                                    function () {
                                        var items = {
                                            side: side,
                                            symbol: symbol.toUpperCase(),
                                            order: order
                                        };
                                        return items;
                                    }
                                ]
                            }
                        });
                    else {
                        $state.go('site.login');
                    }
                }
            };
            return orders;
        }
    ]);
