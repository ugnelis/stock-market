'use strict';

angular.module('app.admin')
    .controller('AdminDashboardController', ['$scope', 'resolvedUsers', 'resolvedOrders', 'users', 'orders', function ($scope, resolvedUsers, resolvedOrders, users, orders) {
        var self = this;

        this.users = resolvedUsers;
        this.orders = resolvedOrders;

        // remove deleted user from array
        this.removeUser = function (index) {
            users.remove(index)
                .then(function (data) {
                    self.users = self.users.filter(function (obj) {
                        return obj.id !== index;
                    });
                });
        };

        // remove deleted order from array
        this.removeOrder = function (index) {
            orders.remove(index)
                .then(function (data) {
                    self.orders = self.orders.filter(function (obj) {
                        return obj.id !== index;
                    });
                });
        };
    }]);
