"use strict";

angular.module('app')
    .factory('order', ['$http', 'API',
        function ($http, API) {
            var order = {
                remove: function (id) {
                    console.log(id);
                    var promise = $http.delete(API.ORDERS + id + '/remove')
                        .then(function (response) {
                            return response.data;
                        });
                    return promise;
                }
            };
            return order;
        }
    ]);
