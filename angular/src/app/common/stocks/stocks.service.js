"use strict";

angular.module('app')
    .factory('stocks', ['$http', 'API',
        function ($http, API) {
            var stocks = {
                getIndex: function () {
                    var promise = $http.get(API.STOCKS)
                        .then(function (response) {
                            return response.data;
                        });
                    return promise;
                },
                getStock: function (symbol) {
                    var promise = $http.get(API.STOCKS + symbol)
                        .then(function (response) {
                            return response.data;
                        });
                    return promise;
                },
                getStockHistory: function (symbol) {
                    var promise = $http.get(API.STOCKS + symbol + "/history")
                        .then(function (response) {
                            return response.data;
                        });
                    return promise;
                },
                getTransactions: function (symbol) {
                    var promise = $http.get(API.STOCKS + symbol + "/transactions")
                        .then(function (response) {
                            return response.data;
                        });
                    return promise;
                }
            };
            return stocks;
        }
    ]);
