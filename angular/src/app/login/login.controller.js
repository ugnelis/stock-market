'use strict';

angular.module('app')
    .controller('LoginController', ['$scope', 'auth',
        function ($scope, auth) {
            this.loginAction = function () {
                this.user.hours = 1;
                auth.login(this.user);
            };
        }]);
