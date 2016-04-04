"use strict";

angular.module('app')
    .controller('OrderController', ['$scope', 'order', 'profile',
        function ($scope, order, profile) {
            var self = this;

            profile.getInventory()
                .then(function (data) {
                    self.inventories = data;
                });

            this.submit = function () {
                order.submit(this.order);
            }
        }]);
