'use strict';

angular.module('app.admin')
    .controller('AdminDashboardController', ['$scope', 'data', 'users', function ($scope, data, users) {
        var self = this;
        this.users = data;

        // remove deleted order from array
        this.removeUser = function (index) {
            users.remove(index)
                .then(function (data) {
                    self.users = self.users.filter(function (obj) {
                        return obj.id !== index;
                    });
                });
        };
    }]);
