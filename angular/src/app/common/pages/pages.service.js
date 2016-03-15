"use strict";

angular.module('app')
    .factory('pages', ['$http', 'API',
        function ($http, API) {
            var stock = {
                getPage: function (uri) {
                    var promise = $http.get(API.PAGES + uri)
                        .then(function (response) {
                            console.log(response);
                            return response.data;
                        });
                    return promise;
                }
            };
            return stock;
        }
    ]);
