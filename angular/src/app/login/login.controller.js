'use strict';

angular.module('app')
    .controller('LoginController', ['$scope', 'auth',
        function ($scope, auth) {

            this.loginAction = function () {
                auth.login(this.user);
            };
        }]);
