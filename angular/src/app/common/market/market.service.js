"use strict";

angular.module('app')
    .factory('market', ['$http', 'API',
        function ($http, API) {
            var market = {
                getInventory: function () {
                    var promise = $http.get(API.MARKET + 'inventory')
                        .then(function (response) {
                            return response.data;
                        });
                    return promise;
                }
            };
            return market;
        }
    ]);
