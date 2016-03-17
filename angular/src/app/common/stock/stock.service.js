"use strict";

angular.module('app')
    .factory('stock', ['$http', 'API',
        function ($http, API) {
            var stock = {
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
                }
            };
            return stock;
        }
    ]);
