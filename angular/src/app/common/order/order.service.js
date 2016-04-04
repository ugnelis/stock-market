"use strict";

angular.module('app')
    .factory('order', ['$http', '$state', '$uibModal', 'principal', 'alert', 'API',
        function ($http, $state, $uibModal, principal, alert, API) {
            var order = {
                submit: function (data) {
                    return $http({
                        method: 'POST',
                        url: API.ORDERS + "submit/",
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
                    var promise = $http.delete(API.ORDERS + id + '/remove')
                        .then(function (response) {
                            return response.data;
                        });
                    return promise;
                },
                openForm: function () {
                    if (principal.isAuthenticated())
                        $uibModal.open({
                            animation: true,
                            templateUrl: 'app/common/order/order.html',
                            controller: 'OrderController as order'
                        });
                    else {
                        $state.go('login');
                    }
                }
            };
            return order;
        }
    ]);
