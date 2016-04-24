"use strict";

angular.module('app.admin')
    .factory('users', ['$http', 'API', 'alert',
        function ($http, API, alert) {
            var users = {
                getIndex: function () {
                    var promise = $http.get(API.USERS)
                        .error(function (response) {
                            alert.add('danger', response.error);
                        })
                        .then(function (response) {
                            return response.data;
                        });
                    return promise;
                },
                remove: function (id) {
                    var promise = $http.delete(API.USERS + id)
                        .error(function (response) {
                            alert.add('danger', response.error);
                        })
                        .then(function (response) {
                            return response.data;
                        });
                    return promise;
                }
            };
            return users;
        }
    ]);
