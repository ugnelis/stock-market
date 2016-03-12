"use strict";

angular.module('app')
    .factory('stock', ['$http', 'API',
        function ($http, API) {
            var stock = {
                getIndex: function () {
                    var promise = $http.get(API.STOCK_INDEX)
                        .then(function (response) {
                            return response.data;
                        });
                    return promise;
                }
            };
            return stock;
        }
    ]);
