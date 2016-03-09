'use strict';

angular.module('app')
    .controller('RegisterController', ['$scope', 'auth',
        function ($scope, auth) {

            this.registerAction = function () {
                auth.register(this.user);
            };
        }]);
