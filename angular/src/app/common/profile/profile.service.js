"use strict";

angular.module('app')
    .factory('profile', ['$http', 'API',
        function ($http, API) {
            var profile = {
                getIndex: function () {
                    var promise = $http.get(API.PROFILE)
                        .then(function (response) {
                            return response.data;
                        });
                    return promise;
                },
                getInventory: function () {
                    var promise = $http.get(API.PROFILE + 'inventory')
                        .then(function (response) {
                            return response.data;
                        });
                    return promise;
                },
                getAccount: function () {
                    var promise = $http.get(API.PROFILE + 'account')
                        .then(function (response) {
                            return response.data;
                        });
                    return promise;
                },
                getOrders: function () {
                    var promise = $http.get(API.PROFILE + 'orders')
                        .then(function (response) {
                            return response.data;
                        });
                    return promise;
                }
            };
            return profile;
        }
    ]);
