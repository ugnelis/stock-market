'use strict';

angular.module('app')
    .controller('RegisterController', ['$scope', 'auth', 'alert',
        function ($scope, auth, alert) {
            this.alert = alert;

            this.registerAction = function () {
                auth.register(this.user);
            };
        }]);
